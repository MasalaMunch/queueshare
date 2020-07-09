"use strict";

const execa = require(`execa`);
const logp = require(`../logp`);
const path = require(`path`);

const startChildProcess = (config) => {

    const childProcess = execa.node(

        path.join(__dirname, `childProcess.script.js`), 

        [JSON.stringify({...config})],

        );

    childProcess.stdout.pipe(process.stdout);

    childProcess.stderr.pipe(process.stderr);

    let shouldRestart = false;

    childProcess.on(`message`, (message) => {

        if (message === `restart`) {

            shouldRestart = true;

            childProcess.send(`restartReceived`);

        }

    });

    childProcess.on(`exit`, () => {

        if (shouldRestart) {

            startChildProcess(config);

        }

    });

};

const start = (config) => {

    if (!logp.hasStarted) {

        logp.start();

    }

    startChildProcess(config);

};

module.exports = start;
