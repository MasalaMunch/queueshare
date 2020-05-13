"use strict";

const assert = require(`assert`);

const Comparison = (a, b) => a - b;

const oldest = 0;

const LocalVersion = {

    Comparison,

    oldest,

    validate: (localVersion) => {

        assert(Number.isInteger(localVersion));

        assert(Comparison(localVersion, oldest) >= 0);

    },

    Newer: (localVersion) => localVersion + 1,

    };

module.exports = LocalVersion;
