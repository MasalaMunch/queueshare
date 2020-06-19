"use strict";

const semver = require(`semver`);

const nodeVersion = semver.valid(process.version);

module.exports = nodeVersion;
