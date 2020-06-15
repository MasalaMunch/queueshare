"use strict";

const log = require(`../log-to-qss`);
const processMessages = require(`../qss-process-messages`);

const restart = (...thingsToLog) => {

    log(...thingsToLog, `Restarting...`);

    process.send(processMessages.restartCommand);

};

module.exports = restart;
