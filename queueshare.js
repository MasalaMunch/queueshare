"use strict";

const clArgs = require(`cl-args`);
const defaultConfig = require(`./defaultConfig.js`);
const define = require(`define`);
const log = require(`./log.js`);
const path = require(`path`);
const periodicallyUpdate = require(`./periodicallyUpdate.js`);
const serve = require(`./serve.js`);

log(`Setting up...`);

const config = JSON.parse(clArgs[0]);

define(config, defaultConfig);

const {dir, npmCommand, port} = config;

periodicallyUpdate(npmCommand);    

serve(dir, port);
