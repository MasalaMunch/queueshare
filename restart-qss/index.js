"use strict";

const log = require(`../log-to-qss`);
const processMessages = require(`../qss-process-messages`);

const restart = (...thingsToLog) => {

    process.on(`message`, (message) => {

        if (message === processMessages.restartConfirmation) {

            log(...thingsToLog, `Restarting...`);

            process.exit();

        }

    });

    process.send(processMessages.restartCommand);

};

module.exports = restart;
