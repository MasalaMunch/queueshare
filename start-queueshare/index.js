"use strict";

const Obj = require(`../obj`);
const path = require(`path`);

const defaultConfig = require(`../default-queueshare-config`);
const keepUpdated = require(`./keepUpdated.js`);
const log = require(`../log-to-queueshare`);
const serve = require(`../serve-queueshare`);


module.exports = (config) => {

    config = Obj(config);

    Obj.define(config, defaultConfig);

    const {dir, port} = config;

    log(`Setting up...`);

    keepUpdated();

    serve(dir, port);

};
