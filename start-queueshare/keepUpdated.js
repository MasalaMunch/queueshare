"use strict";

const path = require(`path`);

const processMessages = require(`../queueshare-process-messages`);

const start = () => {

    //TODO run npm up using execa

    const packageLockPath = path.resolve(__dirname, `..`, `package-lock.json`);

    //TODO use this^ to check if changes happened and restart if they did

    setTimeout(() => start(), 1000 * 60 * 60);

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
