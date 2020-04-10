"use strict";

const assert = require(`assert`);

const Comparison = (aVersion, bVersion) => aVersion - bVersion;

const oldest = 0;

module.exports = {

    Comparison,

    oldest,

    validate: (version) => {

        assert(Number.isInteger(version));

        assert(Comparison(version, oldest) >= 0);

    },

    Newer: (version) => version + 1,

    };