"use strict";

const clArgs = require(`./cl-args`);

const start = require(`./start-queueshare`);

start(JSON.parse(clArgs[0]));
