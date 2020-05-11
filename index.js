"use strict";

const child_process = require(`child_process`);
const path = require(`path`);
const ShallowCopy = require(`shallow-copy`);

const processMessages = require(`queueshare-process-messages`);

const start = (config) => {

    const childProcess = child_process.fork(

        path.join(__dirname, `childProcess.js`), 

        [JSON.stringify(ShallowCopy(config))],

        );

    let shouldRestart = false;

    childProcess.on(`message`, (message) => {

        if (message === processMessages.restartCommand) {

            shouldRestart = true;

            childProcess.send(processMessages.restartConfirmation);

        }

    });

    childProcess.on(`exit`, () => {

        if (shouldRestart) {

            start(config);

        }

    });

};

module.exports = (config) => {

    console.log();

    start(config);

};
