"use strict";

const SyncedState = require(`./SyncedState.js`);
const SyncableVersion = require(`./SyncableVersion.js`);
const Version = require(`./Version.js`);

module.exports = class extends SyncedState {

    constructor () {

        super();

        this._keyLocalVersions = new Map();

        this._keyVersions = new Map();

    }

    _LocalVersionOfKey (key) {

        const storedVersion = this._keyLocalVersions.get(key);

        return (
            storedVersion === undefined? Version.oldest : storedVersion
            );

    }

    _VersionOfKey (key) {

        const storedVersion = this._keyVersions.get(key);

        return (
            storedVersion === undefined? SyncableVersion.oldest : storedVersion
            );

    }

    _write (newParsedChange) {

        super._write(newParsedChange);

        const {key, version} = newParsedChange;

        const previousLocalVersion = this._LocalVersionOfKey(key);

        this._localVersionChanges.delete(previousLocalVersion);

        this._localVersionTree.remove(previousLocalVersion);

        this._keyLocalVersions.set(key, this._currentLocalVersion);

        this._keyVersions.set(key, version);

    }

    };