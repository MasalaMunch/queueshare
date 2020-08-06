"use strict";

const eventuallyRestart = require(`./eventuallyRestart.js`);
const restartMsg = require(`./restartMsg.js`);

const eventuallyUpdate = () => {

    log(`QueueShare was updated.`, restartMsg);

    eventuallyRestart();

};

module.exports = eventuallyUpdate;
