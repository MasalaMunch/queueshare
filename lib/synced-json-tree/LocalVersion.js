"use strict";

const assert = require(`assert`);

const LocalVersion = {

    oldest: 0,

    Newer: (localVersion) => localVersion + 1,

    Valid (localVersion) {

        assert(Number.isInteger(localVersion));

        assert(localVersion >= this.oldest);

        return localVersion;

    },

    };

module.exports = LocalVersion;
