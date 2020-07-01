"use strict";

const assert = require(`assert`);
const PortableUuid = require(`../portable-uuid`);

const pid = PortableUuid();

const Version = {

    Comparison: (a, b) => (a._int - b._int) || a._pid.localeCompare(b._pid),

    oldest: {_int: 0, _pid: ``},

    Newer: (version) => ({_int: version._int + 1, _pid: pid}),

    Valid: (version) => {

        assert(Number.isInteger(version._int));

        assert(typeof version._pid === `string`);

        assert(Version.Comparison(version, Version.oldest) >= 0);

        return version;

    },

    };

module.exports = Version;
