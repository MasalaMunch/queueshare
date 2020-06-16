"use strict";

const eventuallyRestart = require(`./eventuallyRestart.js`);
const packageUpdater = require(`./packageUpdater.js`);

const update = () => {

    let willRestart = false;

    if (packageUpdater.hasUpdated) {

        eventuallyRestart(`QueueShare was updated.`);

        willRestart = true;

    }

    return willRestart;

};

module.exports = update;
