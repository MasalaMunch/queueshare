"use strict";

const RedBlackTree = require(`bintrees`).RBTree;
const versions = require(`./versions.js`);

module.exports = class {

    constructor () {

        this._currentLocalVersion = versions.oldest;

        this._localVersionChanges = new versions.Map();

        this._localVersionTree = new RedBlackTree(versions.Comparison);

    }

    ChangesSince (version) {

        version = versions.Normalized(version);

        const versionIterator = this._localVersionTree.upperBound(version);

        const changes = [];

        while (versionIterator.data() !== null) {

            changes.push(this._localVersionChanges.get(versionIterator.data()));

            versionIterator.next();

        }

        return changes;

    }

    get currentVersion () {

        return this._currentLocalVersion;

    }

    receive (change) {

        const parsedChange = this._Parsed(change);

        if (this._IsNew(parsedChange)) {

            this._write(parsedChange);

        }

    }

    _IsNew (parsedChange) {

        throw new Error(`method not implemented`);

    }

    _Parsed (change) {

        throw new Error(`method not implemented`);

    }

    _write (newParsedChange) {

        const {change} = newParsedChange;

        this._currentLocalVersion = versions.Newer(this._currentLocalVersion);

        this._localVersionChanges.set(this._currentLocalVersion, change);

        this._localVersionTree.insert(this._currentLocalVersion);

    }

    };