"use strict";

const assert = require(`assert`);
const EscapedForRegExp = require(`escape-string-regexp`);
const freeze = require(`deep-freeze`);
const RedBlackTree = require(`bintrees`).RBTree;
const SyncedMap = require(`./SyncedMap.js`);
const SyncableVersion = require(`./SyncableVersion.js`);

const stringSeparator = `\n`;

const validatePath = (path) => {

    assert(Array.isArray(path));

    for (const string of path) {

        assert(typeof string === `string`);
        assert(string.length > 0);
        assert(!string.includes(stringSeparator));

    }

};

const rootKey = ``;

const FullPath = (path) => [rootKey].concat(path);

const Key = (fullPath) => fullPath.join(stringSeparator);

module.exports = class extends SyncedMap {

    constructor () {

        super();

        this._keyTree = new RedBlackTree((a, b) => a.localeCompare(b));
    
    }

    Version (path) {

        validatePath(path);

        const version = this._VersionOfKey(Key(FullPath(path)));

        freeze(version);

        return version;

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

        this._keyTree.remove(key);

    }

    _IsNew (parsedChange) {

        const {fullPath, fullPathKeys, fullPathVersions} = parsedChange;

        let isNew = false;

        for (let i=0; i<fullPath.length; i++) {

            const key = fullPathKeys[i];
            const version = fullPathVersions[i];

            const versionComparison = 
                SyncableVersion.Comparison(version, this._VersionOfKey(key));

            if (versionComparison !== 0) {

                if (versionComparison > 0) {

                    assert(i === fullPath.length-1);

                    isNew = true;

                }

                break;

            }

        }

        return isNew;

    }

    _Parsed (change) {

        let {path, fullPathVersions} = change;

        validatePath(path);

        const fullPath = FullPath(path);

        const fullPathKeys = new Array(fullPath.length);

        for (let i=0; i<fullPath.length; i++) {

            fullPathKeys[i] = Key(fullPath.slice(0, i+1));

        }

        if (fullPathVersions === undefined) {

            fullPathVersions = fullPathKeys.map(this._VersionOfKey, this);

            const i = fullPath.length-1;

            fullPathVersions[i] = SyncableVersion.Newer(fullPathVersions[i]);

        }
        else {

            assert(Array.isArray(fullPathVersions));

            assert(fullPathVersions.length === fullPath.length);

            fullPathVersions.forEach(SyncableVersion.validate);

        }

        change = {path, fullPathVersions};


        return {
            change: {path, fullPathVersions}, 
            fullPath, 
            fullPathKeys,
            fullPathVersions,
            key: fullPathKeys[fullPath.length-1],
            version: fullPathVersions[fullPath.length-1],
            };

    }

    _write (newParsedChange) {

        super._write(newParsedChange);

        const {key} = newParsedChange;

        this._keyTree.insert(key);

        for (const childKey of this._ChildKeys(key)) {

            this._delete(childKey);

        }

    }

    };