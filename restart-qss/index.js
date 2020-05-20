"use strict";

const doNothing = require(`../do-nothing`);

const log = require(`../log-to-qss`);
const processMessages = require(`../qss-process-messages`);

const restartQss = (...thingsToLog) => {

    process.send(processMessages.restartCommand);

    log(...thingsToLog, `Restarting...`);

    log.disable();

};

module.exports = restartQss;
