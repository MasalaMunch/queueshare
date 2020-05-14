"use strict";

const clArgs = require(`./cl-args`);

const keepUpdated = require(`./keep-queueshare-updated`);
const log = require(`./log-to-queueshare`);
const monitor = require(`./monitor-queueshare`);
const serve = require(`./serve-queueshare`);

log(`Setting up...`);

const {folder, isDev, shouldUpdate} = JSON.parse(clArgs[0]);

const pkgPath = __dirname;

if (isDev) {

    monitor(pkgPath);

}
else if (shouldUpdate) {

    keepUpdated(pkgPath);

}

serve(folder);
