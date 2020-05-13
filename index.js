"use strict";

const doNothing = require(`./do-nothing`);
const execa = require(`execa`);
const Obj = require(`./obj`);
const path = require(`path`);
const throwError = require(`./throw-error`);

const processMessages = require(`./queueshare-process-messages`);

const start = (config) => {

    const {beVerbose} = Obj(config);

    const childProcess = execa.node(

        path.join(__dirname, `childProcess.js`), 

        [JSON.stringify(Obj(config))],

        );

    childProcess.stdout.pipe(process.stdout);

    childProcess.stderr.pipe(process.stderr);

    childProcess.catch(beVerbose? throwError : doNothing);

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
