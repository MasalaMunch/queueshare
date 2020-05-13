"use strict";

const assert = require(`assert`);
const UrlEncodedUuid = require(`../url-encoded-uuid`);
const UuProcessId = require(`../uu-process-id`);

const Comparison = (a, b) => {

    const numberComparison = a._number - b._number;

    if (numberComparison === 0) {

        return a._tiebreaker.localeCompare(b._tiebreaker);

    }

    return numberComparison;

};

const oldest = {_number: 0, _tiebreaker: ``};

const myTiebreaker = UrlEncodedUuid(UuProcessId());

module.exports = {

    Comparison,

    oldest,

    validate: (version) => {

        assert(Number.isInteger(version._number));

        assert(typeof version._tiebreaker === `string`);

        assert(Comparison(version, oldest) >= 0);

    },

    Newer: (version) => {

        return {_number: version._number + 1, _tiebreaker: myTiebreaker};

    },

    };