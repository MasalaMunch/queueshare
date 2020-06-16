"use strict";

const packageUpdater = require(`../qsp-updater`);
const restart = require(`../restart-qss`);

const update = () => {

    let willRestart = false;

    if (packageUpdater.hasUpdated) {

        restart(`QueueShare was updated.`);

        willRestart = true;

    }

    return willRestart;

};

module.exports = update;
