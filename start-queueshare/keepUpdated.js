"use strict";

const execa = require(`execa`);
const fs = require(`fs`);
const path = require(`path`);

const processMessages = require(`../queueshare-process-messages`);

const pkgPath = path.resolve(__dirname, `..`);

const PkgLockModTime = async () => {
    
    const pkgLockPath = path.join(pkgPath, `package-lock.json`);

    return (await fs.promises.stat(pkgLockPath)).mtimeMs;

};

const start = async () => {

    const pkgLockModTime = await PkgLockModTime();

    await execa(`npm`, [`install`], {cwd: pkgPath});

    const newPkgLockModTime = await PkgLockModTime();

    if (pkgLockModTime === newPkgLockModTime) {

        setTimeout(start, 1000 * 60 * 60);        

    }
    else {

        process.send(processMessages.restartCommand);

    }

};

const keepUpdated = () => {

    process.on(`message`, (message) => {

        if (message === processMessages.restartConfirmation) {

            process.exit();

        }

    });

    start();

};

module.exports = keepUpdated;
