"use strict";

const assert = require(`assert`);
const UrlEncodedUuid = require(`../url-encoded-uuid`);
const uuid = require(`uuid`);

const pid = UrlEncodedUuid(uuid.v4());

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
