"use strict";

const ChildProcess = require(`child_process`);
const processMessages = require(`./processMessages.js`);
const ShallowCopy = require(`shallow-copy`);

const start = (configAsString) => {

    const qsProcess = ChildProcess.fork(`queueshare.js`, [configAsString]);

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
