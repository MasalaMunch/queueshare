"use strict";

const assert = require(`assert`);
const urlSafeChars = require(`./urlSafeChars.js`);
const uuidForProcess = require(`./uuidForProcess.js`);
const UuidTranslator = require(`short-uuid`);
const Version = require(`./Version.js`);

const Comparison = (a, b) => {

    return (
        Version.Comparison(a._version, b._version) 
        || a._tiebreaker.localeCompare(b._tiebreaker)
        );

};

const oldest = {_version: Version.oldest, _tiebreaker: ``};

const myTiebreaker = UuidTranslator(urlSafeChars).fromUUID(uuidForProcess);

module.exports = {

    Comparison,

    oldest,

    validate: (syncableVersion) => {

        Version.validate(syncableVersion._version);

        assert(typeof syncableVersion._tiebreaker === `string`);

    },

    Newer: (syncableVersion) => {

        return {
            _version: Version.Newer(syncableVersion._version), 
            _tiebreaker: myTiebreaker,
            };

    },

    };