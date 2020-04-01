"use strict";

const firstVersion = 0;

module.exports = class {

    constructor ({storedJsonLog}) {

        this._currentVersion = firstVersion;

        this._changesAsJsonStorage = storedJsonLog;

    }

    write (changesAsJson) {

        console.log(`writing`, changesAsJson);

    }

    CurrentVersion () {

        return this._currentVersion;

    }

    ChangesSince (version) {

        return [];

    }

    };

Object.assign(module.exports, {firstVersion});