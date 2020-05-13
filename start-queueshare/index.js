"use strict";

const keepUpdated = require(`./keepUpdated.js`);
const log = require(`../log-to-queueshare`);
const serve = require(`../serve-queueshare`);

const startQueueshare = (config) => {

    const {dir} = config;

    log(`Setting up...`);

    keepUpdated();

    serve(dir);

};

module.exports = startQueueshare;
