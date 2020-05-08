"use strict";

const child_process = require(`child_process`);
const path = require(`path`);
const processMessages = require(`./processMessages.js`);
const ShallowCopy = require(`shallow-copy`);

const qsPath = path.join(__dirname, `queueshare.js`);

const start = (configAsString) => {

    const qsProcess = child_process.fork(qsPath, [configAsString]);

    let shouldRestart = false;

    qsProcess.on(`message`, (message) => {

        if (message === processMessages.restartCommand) {

            shouldRestart = true;

            qsProcess.send(processMessages.restartConfirmation);

        }

    });

    qsProcess.on(`exit`, () => {

        if (shouldRestart) {

            start(configAsString);

        }

    });

};

module.exports = (config) => {

    console.log();

    start(JSON.stringify(ShallowCopy(config)));

};
