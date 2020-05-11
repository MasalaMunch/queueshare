"use strict";


const define = require(`../define`);
const path = require(`path`);
const ShallowCopy = require(`../shallow-copy`);

const defaultConfig = require(`../default-queueshare-config`);
const keepUpdated = require(`./keepUpdated.js`);
const log = require(`../log-to-queueshare`);
const serve = require(`../serve-queueshare`);


module.exports = (config) => {

    config = ShallowCopy(config);

    define(config, defaultConfig);

    const {dir, port} = config;

    log(`Setting up...`);

    keepUpdated();

    serve(dir, port);

};
