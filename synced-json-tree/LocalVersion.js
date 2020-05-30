"use strict";

const assert = require(`assert`);

const LocalVersion = {

    oldest: 0,

    Newer: (localVersion) => localVersion + 1,

    Valid: (localVersion) => {

        assert(Number.isInteger(localVersion));

        assert(localVersion >= LocalVersion.oldest);

        return localVersion;

    },

    };

module.exports = LocalVersion;
