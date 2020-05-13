"use strict";

const keepUpdated = require(`./keepUpdated.js`);
const log = require(`../log-to-queueshare`);
const serve = require(`../serve-queueshare`);

module.exports = (config) => {

    const {dir} = config;

    log(`Setting up...`);

    keepUpdated();

    serve(dir);

};
