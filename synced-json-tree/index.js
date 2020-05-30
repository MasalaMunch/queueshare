"use strict";

const assert = require(`assert`);
const EventEmitter = require(`events`);
const RedBlackTree = require(`bintrees`).RBTree;

const LocalVersion = require(`./LocalVersion.js`);
const Tree = require(`./Tree.js`);
const Version = require(`./Version.js`);

const SyncedJsonTree = class {

    constructor (changes) {

        this.currentLocalVersion = LocalVersion.oldest;

        this.events = new EventEmitter();

        this._localVersionChanges = new Map();

        this._orderedLocalVersions = new RedBlackTree((a, b) => a - b);

        this._tree = new Tree();

    }

    Changes () {

        return this.ChangesSince(undefined);

    }

    ChangesSince (localVersion = LocalVersion.oldest) {

        localVersion = LocalVersion.Valid(localVersion);

        const iterator = this._orderedLocalVersions.upperBound(localVersion);

        const changes = [];

        while (iterator.data() !== null) {

            changes.push(this._localVersionChanges.get(iterator.data()));

            iterator.next();

        }

        return changes;

    }

    receive (foreignChange) {

        this._receive(this._ValidForeignChange(foreignChange));

    }

    write (localChange) {

        localChange = this._ValidLocalChange(localChange);

        assert(this._receive(this._ForeignChange(localChange)));

    }

    _Change (foreignChange) {

        return {

            ...foreignChange,

            localVersion: LocalVersion.Newer(this.currentLocalVersion),

            };

    }

    _ForeignChange (localChange, versions = undefined) {

        if (versions === undefined) {

            versions = [...this._Versions(localChange.path)];

            const targetVersion = versions[versions.length-1];

            versions[versions.length-1] = Version.Newer(targetVersion);

        }

        return {...localChange, versions};

    }

    *_iterativelyBuild (path) {

        let tree = this._tree;

        yield tree;

        for (const child of path) {

            let childTree = tree.childTrees.get(child);

            if (childTree === undefined) {

                childTree = new Tree();

                tree.childTrees.set(child, childTree);

            }

            tree = childTree;

            yield tree;

        }

    }

    _ValidForeignChange (foreignChange) {

        const {versions} = foreignChange;

        assert(Array.isArray(versions));

        assert(versions.length === 1 + foreignChange.path.length);

        return this._ForeignChange(

            this._ValidLocalChange(foreignChange),

            versions.map(Version.Valid),

            );

    }

    _ValidLocalChange (localChange) {

        const {path, value} = localChange;

        assert(Array.isArray(path));

        path.forEach((child) => assert(typeof child === `string`));

        return {

            path,

            value: (
                value === undefined? value : JSON.parse(JSON.stringify(value))
                ),

            };

    }

    _receive (foreignChange) {

        const {versions} = foreignChange;

        let i = 0;

        let wasWritten = false;

        for (const tree of this._iterativelyBuild(foreignChange.path)) {

            const versionComparison = (

                Version.Comparison(versions[i], tree.Version())

                );

            if (versionComparison !== 0) {

                if (versionComparison > 0) {

                    if (i === versions.length-1) {

                        this._write(foreignChange, tree);

                        wasWritten = true;

                    }
                    else {

                        tree.pendingForeignChanges.push(foreignChange);

                    }

                }

                break;

            }

            i++;

        }

        return wasWritten;

    }


    *_Versions (path) {

        let tree = this._tree;

        yield tree.Version();

        for (const child of path) {

            if (tree !== undefined) {

                tree = tree.childTrees.get(child);

            }

            yield (tree === undefined? Version.oldest : tree.Version());

        }

    }

    _write (foreignChange, tree) {

        const change = this._Change(foreignChange);

        const {localVersion} = change;

        this.currentLocalVersion = localVersion;

        this._localVersionChanges.set(localVersion, change);

        this._orderedLocalVersions.insert(localVersion);

        for (const subtree of tree.Traversal()) {

            if (subtree.change !== undefined) {

                this._localVersionChanges.delete(subtree.change.localVersion);

                this._orderedLocalVersions.remove(subtree.change.localVersion);

            }

        }

        tree.childTrees = new Map();

        tree.change = change;

        this.events.emit(`change`, change);

        const {pendingForeignChanges} = tree;

        tree.pendingForeignChanges = [];

        for (const foreignChange of pendingForeignChanges) {

            this._receive(foreignChange);

        }

    }

    };

module.exports = SyncedJsonTree;
