"use strict";

const assert = require(`assert`);
const SafeEventEmitter = require(`../safe-event-emitter`);

const Change = require(`./Change.js`);
const ForeignChange = require(`./ForeignChange.js`);
const LocalChange = require(`./LocalChange.js`);
const LocalVersion = require(`./LocalVersion.js`);
const Tree = require(`./Tree.js`);
const Version = require(`./Version.js`);

const SyncedJsonTree = class {

    constructor () {

        this.events = new SafeEventEmitter();

        this._currentLocalVersion = LocalVersion.oldest;

        this._tree = new Tree();

    }

    receive (foreignChange, extraInfo = undefined) {

        this._receive(ForeignChange.Valid(foreignChange), extraInfo);

    }

    write (localChange, extraInfo = undefined) {

        localChange = LocalChange.Valid(localChange);

        const versions = [...this._Versions(localChange.path)];

        const targetVersion = versions[versions.length-1];

        versions[versions.length-1] = Version.Newer(targetVersion);

        this._receive(ForeignChange(localChange, versions), extraInfo);

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

    _receive (foreignChange, extraInfo) {

        assert(this.events.hasStarted);

        const {path, versions} = foreignChange;

        let i = 0;

        for (const tree of this._iterativelyBuild(path)) {

            const versionComparison = (

                Version.Comparison(versions[i], tree.version)

                );

            if (versionComparison !== 0) {

                if (versionComparison > 0) {

                    if (i === versions.length-1) {

                        this._write(foreignChange, extraInfo, tree);

                    }
                    else {

                        tree.pendingReceipts.push([foreignChange, extraInfo]);

                    }

                }

                break;

            }

            i++;

        }

    }

    *_Versions (path) {

        let tree = this._tree;

        yield tree.version;

        for (const child of path) {

            if (tree !== undefined) {

                tree = tree.childTrees.get(child);

            }

            yield tree === undefined? Version.oldest : tree.version;

        }

    }

    _write (foreignChange, extraInfo, tree) {

        tree.version = foreignChange.versions[foreignChange.versions.length-1];

        for (const subtree of tree.Traversal()) {

            if (subtree.localVersion !== undefined) {

                this.events.emit(`localVersionDeletion`, subtree.localVersion);

            }

        }

        tree.childTrees = new Map();

        const localVersion = LocalVersion.Newer(this._currentLocalVersion);

        this._currentLocalVersion = localVersion;

        tree.localVersion = localVersion;

        this.events.emit(

            `change`, 

            Change(foreignChange, localVersion), 

            extraInfo,

            );

        const {pendingReceipts} = tree;

        tree.pendingReceipts = [];

        for (const receipt of pendingReceipts) {

            this._receive(...receipt);

        }

    }

    };

SyncedJsonTree.LocalVersion = LocalVersion;

module.exports = SyncedJsonTree;
