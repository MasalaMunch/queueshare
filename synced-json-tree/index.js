"use strict";

const assert = require(`assert`);
const doNothing = require(`../do-nothing`);
const EventEmitter = require(`events`);
const Obj = require(`../obj`);
const RedBlackTree = require(`bintrees`).RBTree;

const LocalVersion = require(`./LocalVersion.js`);
const Tree = require(`./Tree.js`);
const Version = require(`./Version.js`);

const SyncedJsonTree = class extends EventEmitter {

    constructor () {

        super();

        this._localVersion = LocalVersion.oldest;

        this._localVersionChanges = new Map();

        this._localVersionTree = new RedBlackTree(LocalVersion.Comparison);

        this._tree = new Tree();

    }

    *Changes () {

        yield* this.ChangesSince();

    }

    *ChangesSince (localVersion) {

        if (localVersion === undefined) {

            localVersion = LocalVersion.oldest;

        }
        else {

            LocalVersion.validate(localVersion);

        }

        const iterator = this._localVersionTree.upperBound(localVersion);

        while (iterator.data() !== null) {

            yield this._localVersionChanges.get(iterator.data());

            iterator.next();

        }

    }

    LocalVersion () {

        return this._localVersion;

    }

    receive (foreignChange) {

        foreignChange = this._NormalizedForeignChange(foreignChange);

        this._receive(foreignChange);

    }

    restore (change) {

        change = this._NormalizedChange(change);

        this._receive(change);

    }

    write (localChange) {

        localChange = this._NormalizedLocalChange(localChange);

        this._foreignify(localChange);

        this._write(localChange);

    }

    _changify (foreignChange, localVersion) {

        if (localVersion === undefined) {

            localVersion = LocalVersion.Newer(this._localVersion);

        }

        foreignChange.localVersion = localVersion;

    }

    _foreignify (localChange, versions) {

        if (versions === undefined) {

            versions = this._tree.Versions(localChange.path);

            const targetVersion = versions[versions.length-1];

            versions[versions.length-1] = Version.Newer(targetVersion);

        }

        localChange.versions = versions;

    }

    _IsForeignChange (foreignChangeOrChange) {

        return (foreignChangeOrChange.localVersion === undefined);

    }

    _NormalizedChange (change) {

        const foreignChange = this._NormalizedForeignChange(change);

        const {localVersion} = change;

        LocalVersion.validate(localVersion);

        assert(!this._localVersionChanges.has(localVersion));

        this._changify(foreignChange, localVersion);

        return foreignChange;

    }

    _NormalizedForeignChange (foreignChange) {

        const localChange = this._NormalizedLocalChange(foreignChange);

        const {versions} = foreignChange;

        assert(Array.isArray(versions));

        assert(versions.length === 1 + localChange.path.length);

        versions.forEach(Version.validate);

        this._foreignify(localChange, versions);

        return localChange;

    }

    _NormalizedLocalChange (localChange) {

        const {path, value} = localChange;

        assert(Array.isArray(path));

        path.forEach((child) => assert(typeof child === `string`));

        return {

            path,

            value: value === undefined? value : JSON.parse(JSON.stringify(value)),

            };

    }

    _receive (foreignChangeOrChange) {

        const {path, versions} = foreignChangeOrChange;

        let i = 0;

        for (const tree of this._tree.iterativelyBuild(path)) {

            const versionComparison = 
                Version.Comparison(versions[i], tree.version);

            if (versionComparison !== 0) {

                if (versionComparison > 0) {

                    if (i === versions.length-1) {

                        this._write(foreignChangeOrChange);

                    }
                    else {

                        tree.pendingFunctions.push(() => {

                            this._receive(foreignChangeOrChange);

                        });

                    }

                }

                break;

            }

            i++;

        }

    }

    _write (foreignChangeOrChange) {

        if (this._IsForeignChange(foreignChangeOrChange)) {

            this._changify(foreignChangeOrChange);

        }

        const change = foreignChangeOrChange;

        const {path, versions, localVersion} = change;

        if (LocalVersion.Comparison(localVersion, this._localVersion) > 0) {

            this._localVersion = localVersion;

        }

        this._localVersionChanges.set(localVersion, change);

        this._localVersionTree.insert(localVersion);

        const tree = this._tree.build(path);

        for (const {localVersion} of tree.Traversal()) {

            this._localVersionChanges.delete(localVersion);

            this._localVersionTree.remove(localVersion);

        }

        tree.childTrees = new Map();

        tree.localVersion = localVersion;

        tree.version = versions[versions.length-1];

        this.emit(`change`, change);

        const {pendingFunctions} = tree;

        tree.pendingFunctions = [];

        pendingFunctions.forEach((f) => f());

    }

    };

module.exports = SyncedJsonTree;
