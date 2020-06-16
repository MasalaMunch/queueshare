"use strict";

const log = require(`../log-to-qss`);
const processMessages = require(`./processMessages.js`);

process.on(`message`, (message) => {

    if (message === processMessages.restartConfirmation) {

        process.exit();

    }

});

const eventuallyRestart = (...thingsToLog) => {

    log(...thingsToLog, `Restarting...`);

    process.send(processMessages.restartCommand);

};

module.exports = eventuallyRestart;
