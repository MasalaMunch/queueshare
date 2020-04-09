"use strict";

const assert = require(`assert`);

const Comparison = (a, b) => a - b;

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