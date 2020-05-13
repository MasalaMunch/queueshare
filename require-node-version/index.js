"use strict";

const assert = require(`assert`);
const semver = require(`semver`);

const requireNodeVersion = (version) => {

    assert(semver.gte(process.version, version));

};

module.exports = requireNodeVersion;
