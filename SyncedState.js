"use strict";

const RedBlackTree = require(`bintrees`).RBTree;
const Version = require(`./Version.js`);

module.exports = class {

    constructor () {

        this._currentLocalVersion = Version.oldest;

        this._localVersionChanges = new Version.Map();

        this._localVersionTree = new RedBlackTree(Version.Comparison);

    }

    ChangesSince (version) {

        version = Version.Normalized(version);

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

        this._currentLocalVersion = Version.Newer(this._currentLocalVersion);

        this._localVersionChanges.set(this._currentLocalVersion, change);

        this._localVersionTree.insert(this._currentLocalVersion);

    }

    };