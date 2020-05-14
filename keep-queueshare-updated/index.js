"use strict";

const execa = require(`execa`);
const fs = require(`fs`);
const path = require(`path`);

const log = require(`../log-to-queueshare`);
const processMessages = require(`../queueshare-process-messages`);

const ModTime = async (path) => (await fs.promises.stat(path)).mtimeMs;

const keepQueueshareUpdated = async (pkgPath) => {

    const pkgLockPath = path.join(pkgPath, `package-lock.json`);

    const pkgLockModTime = await ModTime(pkgLockPath);

    await execa(`npm`, [`install`], {cwd: pkgPath});

    const newPkgLockModTime = await ModTime(pkgLockPath);

    if (pkgLockModTime === newPkgLockModTime) {

        setTimeout(() => keepQueueshareUpdated(pkgPath), 1000 * 60 * 60);        

    }
    else {

        log(`QueueShare was updated. Restarting...`);

        process.send(processMessages.restartCommand);

    }

};

module.exports = keepQueueshareUpdated;
