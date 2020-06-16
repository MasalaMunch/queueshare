"use strict";

const packageUpdater = require(`./packageUpdater.js`);
const restart = require(`./restart.js`);

const update = () => {

    let willRestart = false;

    if (packageUpdater.hasUpdated) {

        restart(`QueueShare was updated.`);

        willRestart = true;

    }

    return willRestart;

};

module.exports = update;
