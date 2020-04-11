"use strict";

const assert = require(`assert`);
const EmptyArray = require(`./EmptyArray.js`);
const EscapedForRegExp = require(`escape-string-regexp`);
const LazyMap = require(`./LazyMap.js`);
const RedBlackTree = require(`bintrees`).RBTree;
const SyncedMap = require(`./SyncedMap.js`);
const SyncableVersion = require(`./SyncableVersion.js`);

const stringSeparator = `\n`;
const rootKey = ``;

const KeyComparison = (aKey, bKey) => aKey.localeCompare(bKey);

module.exports = class extends SyncedMap {

    constructor () {

        super();

        this._keyPendingTasks = new LazyMap(EmptyArray);

        this._keyTree = new RedBlackTree(KeyComparison);
    
    }

    _ChildKeys (key) {

        const childKeyPrefix = key + stringSeparator;

        const keyIterator = this._keyTree.lowerBound(childKeyPrefix);

        const childKeyRegExp = new RegExp(`^`+EscapedForRegExp(childKeyPrefix));

        const childKeys = [];

        while (keyIterator.data() !== null 
        && childKeyRegExp.test(keyIterator.data())) {

            childKeys.push(keyIterator.data());

            keyIterator.next();

        }

        return childKeys;

    }

    _delete (key) {

        const localVersion = this._LocalVersionOfKey(key);

        this._localVersionChanges.delete(localVersion);

        this._localVersionTree.remove(localVersion);      

        this._keyLocalVersions.delete(key);
        
        this._keyVersions.delete(key);

        this._keyPendingTasks.delete(key);

        this._keyTree.remove(key);

    }

    _Parsed (change) {

        let {path, fullPathVersions} = change;

        assert(Array.isArray(path));

        for (const string of path) {

            assert(typeof string === `string`);
            assert(string.length > 0);
            assert(!string.includes(stringSeparator));

        }

        const fullPath = [rootKey].concat(path);

        const fullPathKeys = new Array(fullPath.length);

        for (let i=0; i<fullPath.length; i++) {

            fullPathKeys[i] = fullPath.slice(0, i+1).join(stringSeparator);

        }

        const isLocal = fullPathVersions === undefined;

        if (isLocal) {

            fullPathVersions = fullPathKeys.map((k) => this._VersionOfKey(k));

            const i = fullPath.length-1;

            fullPathVersions[i] = SyncableVersion.Newer(fullPathVersions[i]);

        }
        else {

            assert(Array.isArray(fullPathVersions));

            assert(fullPathVersions.length === fullPath.length);

            fullPathVersions.forEach(SyncableVersion.validate);

        }

        return {
            change: {path, fullPathVersions}, 
            fullPath, 
            fullPathKeys,
            isLocal,
            key: fullPathKeys[fullPath.length-1],
            version: fullPathVersions[fullPath.length-1],
            };

    }

    _receive (parsedChange, resolve, reject) {

        const {fullPath, fullPathKeys, change: {fullPathVersions}} = parsedChange;

        let isPending = false;

        for (let i=0; i<fullPath.length; i++) {

            const key = fullPathKeys[i];
            const version = fullPathVersions[i];

            const versionComparison = 
                SyncableVersion.Comparison(version, this._VersionOfKey(key));

            if (versionComparison !== 0) {

                if (versionComparison > 0) {

                    if (i === fullPath.length-1) {

                        try {

                            this._write(parsedChange);

                        } catch (error) {

                            reject(error);

                        }


                    }
                    else {

                        isPending = true;

                        this._keyPendingTasks.get(key).push(() => {

                            this._receive(parsedChange, resolve, reject);

                        });

                    }

                }

                break;

            }

        }

        if (!isPending) {

            resolve();

        }

    }

    _write (parsedChange) {

        super._write(parsedChange);

        const {key} = parsedChange;

        this._keyPendingTasks.get(key).forEach((t) => this._taskQueue.add(t));

        this._keyPendingTasks.delete(key);

        this._ChildKeys(key).forEach((k) => this._delete(k));

        this._keyTree.insert(key);

    }

    };