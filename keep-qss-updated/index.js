"use strict";

const execa = require(`execa`);
const fs = require(`fs`);
const path = require(`path`);

const events = require(`../qss-events`);
const packagePath = require(`../qss-package-path`);
const restart = require(`../restart-qss`);

const PackageModTime = async () => {

    return (await fs.promises.stat(packagePath)).mtimeMs;

};

const update = async () => {

    const pkgModTime = await PackageModTime();

    await execa(`npm`, [`update`], {cwd: packagePath});

    const newPkgModTime = await PackageModTime();

    if (pkgModTime !== newPkgModTime) {

        restart(`QueueShare was updated.`);

    }

};

const keepUpdated = () => {

    events.on(`maintenance`, update);

};

module.exports = keepUpdated;
