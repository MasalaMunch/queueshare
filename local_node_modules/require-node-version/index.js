"use strict";

const assert = require(`assert`);
const semver = require(`semver`);

module.exports = (version) => {

    assert(semver.gte(process.version, version));

};
