"use strict";

const assert = require(`assert`);
const urlSafeChars = require(`./urlSafeChars.js`);
const uuidForProcess = require(`./uuidForProcess.js`);
const UuidTranslator = require(`short-uuid`);

const Comparison = (a, b) => {

    return a._number - b._number || a._tiebreaker.localeCompare(b._tiebreaker);

};

const oldest = {_number: 0, _tiebreaker: ``};

const Normalized = (version) => {

    assert(typeof version._number === `number`);
    assert(isFinite(version._number));
    assert(typeof version._tiebreaker === `string`);
    assert(Comparison(version, oldest) >= 0);

    return version;

};

const myTiebreaker = UuidTranslator(urlSafeChars).fromUUID(uuidForProcess);

const Newer = (version) => {

    return {_number: version._number+1, _tiebreaker: myTiebreaker};

};

const AsString = (version) => {

    return String(version._number) + ` ` + version._tiebreaker;

};

const VersionMap = class {

    constructor () {

        this._stringMap = new Map();

    }

    get (version) {

        return this._stringMap.get(AsString(version));

    }

    set (version, value) {

        this._stringMap.set(AsString(version), value);

    }

    delete (version) {

        this._stringMap.delete(AsString(version));

    }

};

module.exports = {Comparison, oldest, Normalized, Newer, Map: VersionMap};