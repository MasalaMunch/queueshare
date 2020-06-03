"use strict";

const execa = require(`execa`);
const fs = require(`fs`);
const path = require(`path`);

const packageFolder = require(`../qss-package-folder`);
const restart = require(`../restart-qss`);

const parentPackageFolder = path.resolve(packageFolder, `..`, `..`);

const packageFile = path.join(packageFolder, `package.json`);

const PackageModTime = async () => {

    return (await fs.promises.stat(packageFile)).mtimeMs;

};

const update = async () => {

    const packageModTime = await PackageModTime();

    await execa(`npm`, [`update`, `queueshare`], {cwd: parentPackageFolder});

    const newPackageModTime = await PackageModTime();

    if (packageModTime !== newPackageModTime) {

        restart(`QueueShare was updated.`);

    }

};

module.exports = update;
