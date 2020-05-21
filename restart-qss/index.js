"use strict";

const log = require(`../log-to-qss`);
const processMessages = require(`../qss-process-messages`);

const restartQss = (...thingsToLog) => {

    process.send(processMessages.restartCommand);

    log(...thingsToLog, `Restarting...`);

};

module.exports = restartQss;
