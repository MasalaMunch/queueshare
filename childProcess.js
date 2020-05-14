"use strict";

const clArgs = require(`./cl-args`);

const keepUpdated = require(`./keep-queueshare-updated`);
const log = require(`./log-to-queueshare`);
const serve = require(`./serve-queueshare`);

log(`Setting up...`);

keepUpdated(__dirname);

serve(JSON.parse(clArgs[0]).folder);
