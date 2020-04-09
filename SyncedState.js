"use strict";

const freeze = require(`deep-freeze`);
const RedBlackTree = require(`bintrees`).RBTree;
const Version = require(`./Version.js`);

module.exports = class {

    constructor () {

        this._currentLocalVersion = Version.oldest;

        this._localVersionChanges = new Map();

        this._localVersionTree = new RedBlackTree(Version.Comparison);

    }

    ChangesSince (version) {

        Version.validate(version);

        const versionIterator = this._localVersionTree.upperBound(version);

        const changes = [];

        while (versionIterator.data() !== null) {

            const c = this._localVersionChanges.get(versionIterator.data());

            freeze(c);

            changes.push(c);

            versionIterator.next();

        }

        return changes;

    }

    get currentVersion () {

        freeze(this._currentLocalVersion);

        return this._currentLocalVersion;

    }

    write (change) {

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