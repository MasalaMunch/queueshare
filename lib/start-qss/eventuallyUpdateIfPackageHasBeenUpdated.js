"use strict";

const eventuallyRestart = require(`./eventuallyRestart.js`);
const packageUpdater = require(`./packageUpdater.js`);
const restartMsg = require(`./restartMsg.js`);

const eventuallyUpdateIfPackageHasBeenUpdated = () => {

    if (packageUpdater.hasUpdated) {

        logp(`QueueShare was updated.`, restartMsg);

        eventuallyRestart();

    }

};

module.exports = eventuallyUpdateIfPackageHasBeenUpdated;