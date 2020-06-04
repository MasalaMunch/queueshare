"use strict";

const packageUpdater = require(`../qsp-updater`);
const restart = require(`../restart-qss`);

const update = () => {

    if (packageUpdater.hasUpdated) {

        restart(`QueueShare was updated.`);

    }

};

module.exports = update;
