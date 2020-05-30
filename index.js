"use strict";

const execa = require(`execa`);
const path = require(`path`);

const log = require(`./log-to-qss`);
const processMessages = require(`./qss-process-messages`);

const start = (config) => {

    const childProcess = execa.node(

        path.join(__dirname, `childProcess.js`), 

        [JSON.stringify({...config})],

        );

    childProcess.stdout.pipe(process.stdout);

    childProcess.stderr.pipe(process.stderr);

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

const queueshare = (config) => {

    log.start();

    start(config);

};

module.exports = queueshare;
