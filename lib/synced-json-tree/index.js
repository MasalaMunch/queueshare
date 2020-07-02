"use strict";

const assert = require(`assert`);
const EventEmitter = require(`events`);

const LocalVersion = require(`./LocalVersion.js`);
const Tree = require(`./Tree.js`);
const Version = require(`./Version.js`);

const SyncedJsonTree = class {

    constructor () {

        this.events = new EventEmitter();

        this._currentLocalVersion = LocalVersion.oldest;

        this._tree = new Tree();

    }

    receive (foreignChange, extraInfo = undefined) {

        this._receive(this._ValidForeignChange(foreignChange), extraInfo);

    }

    write (localChange, extraInfo = undefined) {

        this._write(

            this._ForeignChange(this._ValidLocalChange(localChange)), 

            extraInfo,

            );

    }

    _build (path) {

        let tree;

        for (tree of this._iterativelyBuild(path)) {

        }

        return tree;

    }

    _Change (foreignChange) {

        return {

            ...foreignChange,

            localVersion: LocalVersion.Newer(this._currentLocalVersion),

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

    _receive (foreignChange, extraInfo) {

        let i = 0;

        for (const tree of this._iterativelyBuild(foreignChange.path)) {

            const versionComparison = Version.Comparison(

                foreignChange.versions[i], 

                tree.version,

                );

            if (versionComparison !== 0) {

                if (versionComparison > 0) {

                    if (i === foreignChange.versions.length-1) {

                        this._write(foreignChange, extraInfo);

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

    _ValidForeignChange (foreignChange) {

        const {versions} = foreignChange;

        assert(Array.isArray(versions));

        assert(1+foreignChange.path.length === versions.length);

        return this._ForeignChange(

            this._ValidLocalChange(foreignChange),

            versions.map(Version.Valid),

            );

    }

    _ValidLocalChange (localChange) {

        const {path, value} = localChange;

        assert(Array.isArray(path));

        for (const child of path) {

            assert(typeof child === `string`);

        }

        return {

            path,

            value: (
                value === undefined? value : JSON.parse(JSON.stringify(value))
                ),

            };

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

    _write (foreignChange, extraInfo) {

        const tree = this._build(foreignChange.path);

        tree.version = foreignChange.versions[foreignChange.versions.length-1];

        for (const {localVersion} of tree.Traversal()) {

            if (localVersion !== undefined) {

                this.events.emit(`localVersionDeletion`, localVersion);

            }

        }

        tree.childTrees = new Map();

        const change = this._Change(foreignChange);

        tree.localVersion = change.localVersion;

        this._currentLocalVersion = change.localVersion;

        this.events.emit(`change`, change, extraInfo);

        const {pendingReceipts} = tree;

        tree.pendingReceipts = [];

        for (const receipt of pendingReceipts) {

            this._receive(...receipt);

        }

    }

    };

SyncedJsonTree.LocalVersion = LocalVersion;

module.exports = SyncedJsonTree;
