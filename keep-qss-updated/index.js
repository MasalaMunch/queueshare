"use strict";

const execa = require(`execa`);
const fs = require(`fs`);
const path = require(`path`);

const events = require(`../qss-events`);
const packagePath = require(`../qss-package-path`);
const restart = require(`../restart-qss`);

const packageLockPath = path.join(packagePath, `package-lock.json`);

const PackageLockModTime = async () => {

    let modTime;

    try {

        modTime = (await fs.promises.stat(packageLockPath)).mtimeMs;

    } catch (error) {

        if (error.code !== `ENOENT`) {

            throw error;

        }

    }

    return modTime;

};

const update = async () => {

    const pkgLockModTime = await PackageLockModTime();

    await execa(`npm`, [`update`], {cwd: packagePath});

    const newPkgLockModTime = await PackageLockModTime();

    if (pkgLockModTime !== newPkgLockModTime) {

        restart(`QueueShare was updated.`);

    }

};

const keepUpdated = () => {

    events.on(`maintenance`, update);

};

module.exports = keepUpdated;
