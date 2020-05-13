"use strict";

const assert = require(`assert`);
const semver = require(`semver`);

const requireNode = (version) => {

    assert(semver.gte(process.version, version));

};

module.exports = requireNode;
