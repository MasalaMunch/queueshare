"use strict";

const nodeVersion = require(`../node-version`);
const semver = require(`semver`);

const logp = require(`../logp`);

const requireNodeVersion = (version) => {

    version = semver.valid(version);

    if (semver.lt(nodeVersion, version)) {

        logp(
            `QueueShare requires Node.js version ${version} or later. You're`
            + ` using version ${nodeVersion}. To get a newer version, visit`
            + ` nodejs.org`
            );

        process.exit();

    }

};

module.exports = requireNodeVersion;
