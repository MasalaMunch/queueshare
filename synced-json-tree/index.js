"use strict";

const assert = require(`assert`);
const EventEmitter = require(`events`);
const RedBlackTree = require(`bintrees`).RBTree;

const LocalVersion = require(`./LocalVersion.js`);
const Tree = require(`./Tree.js`);
const Version = require(`./Version.js`);

const SyncedJsonTree = class {

    constructor (changes) {

        this.events = new EventEmitter();

        this._currentLocalVersion = LocalVersion.oldest;

        this._localVersionChanges = new Map();

        this._orderedLocalVersions = new RedBlackTree((a, b) => a - b);

        this._tree = new Tree();

    }

    Changes () {

        return this.ChangesSince(LocalVersion.oldest);

    }

    ChangesSince (localVersion) {

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

        return this._receive(this._ValidForeignChange(foreignChange));

    }

    restore (foreignChange) {

        return this._receive(

            this._IsChange(foreignChange)?

            this._ValidChange(foreignChange) 

            : this._ValidForeignChange(foreignChange)

            );

    }

    write (localChange) {

        localChange = this._ValidLocalChange(localChange);

        const receipt = this._receive(this._ForeignChange(localChange));

        assert(receipt.wasWritten);

        return receipt;

    }

    _Change (foreignChange, localVersion = undefined) {

        if (localVersion === undefined) {

            localVersion = LocalVersion.Newer(this._currentLocalVersion);

        }

        return {...foreignChange, localVersion};

    }

    _ForeignChange (localChange, versions = undefined) {

        if (versions === undefined) {

            versions = [...this._Versions(localChange.path)];

            const targetVersion = versions[versions.length-1];

            versions[versions.length-1] = Version.Newer(targetVersion);

        }

        return {...localChange, versions};

    }

    _IsChange (foreignChange) {

        return foreignChange.localVersion !== undefined;

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

    _receive (foreignChange) {

        const {versions} = foreignChange;

        let i = 0;

        let change;

        let wasWritten = false;

        let wasQueued = false;

        for (const tree of this._iterativelyBuild(foreignChange.path)) {

            const versionComparison = (

                Version.Comparison(versions[i], tree.Version())

                );

            if (versionComparison !== 0) {

                if (versionComparison > 0) {

                    if (i === versions.length-1) {

                        change = this._write(foreignChange, tree);

                        wasWritten = true;

                    }
                    else {

                        tree.queuedForeignChanges.push(foreignChange);

                        wasQueued = true;

                    }

                }

                break;

            }

            i++;

        }

        return {wasQueued, wasWritten, change};

    }

    _ValidChange (change) {

        const {localVersion} = change;

        return this._Change(

            this._ValidForeignChange(change),

            LocalVersion.Valid(localVersion),

            );

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

        for (const subtree of tree.Traversal()) {

            if (subtree.change !== undefined) {

                this._localVersionChanges.delete(subtree.change.localVersion);

                this._orderedLocalVersions.remove(subtree.change.localVersion);

            }

        }

        tree.childTrees = new Map();

        const change = (

            this._IsChange(foreignChange)?

            foreignChange : this._Change(foreignChange)

            );

        tree.change = change;

        const {localVersion} = change;

        assert(localVersion > this._currentLocalVersion);

        this._currentLocalVersion = localVersion;

        this._localVersionChanges.set(localVersion, change);

        this._orderedLocalVersions.insert(localVersion);

        this.events.emit(`change`, change);

        const {queuedForeignChanges} = tree;

        tree.queuedForeignChanges = [];

        for (const c of queuedForeignChanges) {

            this._receive(c);

        }

        return change;

    }

    };

module.exports = SyncedJsonTree;
