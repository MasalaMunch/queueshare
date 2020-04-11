"use strict";

const assert = require(`assert`);
const freeze = require(`./freeze.js`);
const RedBlackTree = require(`bintrees`).RBTree;
const TaskQueue = require(`./TaskQueue.js`);
const Version = require(`./Version.js`);

module.exports = class {

    constructor () {

        this._currentLocalVersion = Version.oldest;

        this._localVersionChanges = new Map();

        this._localVersionTree = new RedBlackTree(Version.Comparison);

        this._taskQueue = new TaskQueue();

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

    receive (change) {

        return new Promise((resolve, reject) => {

            this._taskQueue.add(() => {

                let parsedChange, wasParsed;

                try {

                    parsedChange = this._Parsed(change);
                    wasParsed = true;

                } catch (error) {

                    reject(error);
                    wasParsed = false;

                }

                if (wasParsed) {
                    this._receive(parsedChange, resolve, reject);
                }

            });

        });

    }

    write (localChange) {

        const parsedChange = this._Parsed(localChange);

        assert(parsedChange.isLocal);

        this._write(parsedChange);

    }

    _Parsed (change) {

        throw new Error(`method not implemented`);

    }

    _receive (parsedChange, resolve, reject) {

        throw new Error(`method not implemented`);

    }

    _write (parsedChange) {

        const {change} = parsedChange;

        this._currentLocalVersion = Version.Newer(this._currentLocalVersion);

        this._localVersionChanges.set(this._currentLocalVersion, change);

        this._localVersionTree.insert(this._currentLocalVersion);

    }

    };