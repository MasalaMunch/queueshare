"use strict";

const eventuallyRestart = require(`./eventuallyRestart.js`);
const packageUpdater = require(`./packageUpdater.js`);

const update = () => {

    if (packageUpdater.hasUpdated) {

        eventuallyRestart(`QueueShare was updated.`);

    }

};

module.exports = update;
