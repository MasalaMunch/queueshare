"use strict";

const eventuallyRestart = require(`./eventuallyRestart.js`);
const restartMsg = require(`./restartMsg.js`);

const eventuallyUpdate = () => {

    logp(`QueueShare was updated.`, restartMsg);

    eventuallyRestart();

};

module.exports = eventuallyUpdate;
