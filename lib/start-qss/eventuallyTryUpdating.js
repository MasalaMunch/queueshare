"use strict";

const eventuallyRestart = require(`./eventuallyRestart.js`);
const packageUpdater = require(`./packageUpdater.js`);
const restartMsg = require(`./restartMsg.js`);

const eventuallyTryUpdating = () => {

    if (packageUpdater.hasUpdated) {

        log(`QueueShare was updated.`, restartMsg);

        eventuallyRestart();

    }

};

module.exports = eventuallyTryUpdating;
