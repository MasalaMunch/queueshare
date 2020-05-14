"use strict";

const execa = require(`execa`);
const fs = require(`fs`);
const path = require(`path`);

const processMessages = require(`../queueshare-process-messages`);

const ModTime = async (path) => (await fs.promises.stat(path)).mtimeMs;

const start = async (pkgPath) => {

    const pkgLockPath = path.join(pkgPath, `package-lock.json`);

    const pkgLockModTime = await ModTime(pkgLockPath);

    await execa(`npm`, [`install`], {cwd: pkgPath});

    const newPkgLockModTime = await ModTime(pkgLockPath);

    if (pkgLockModTime === newPkgLockModTime) {

        setTimeout(() => start(pkgPath), 1000 * 60 * 60);        

    }
    else {

        process.send(processMessages.restartCommand);

    }

};

const keepQueueshareUpdated = (pkgPath) => {

    process.on(`message`, (message) => {

        if (message === processMessages.restartConfirmation) {

            process.exit();

        }

    });

    start(pkgPath);

};

module.exports = keepQueueshareUpdated;
