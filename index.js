"use strict";

const execa = require(`execa`);
const Obj = require(`./obj`);
const path = require(`path`);

const processMessages = require(`./queueshare-process-messages`);

const start = (config) => {

    const childProcess = execa.node(

        path.join(__dirname, `childProcess.js`), 

        [JSON.stringify(Obj(config))],

        );

    childProcess.catch((error) => {

        throw error;

    });

    childProcess.stdout.pipe(process.stdout);

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
