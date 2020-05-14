"use strict";

const clArgs = require(`./cl-args`);

const keepUpdated = require(`./keep-queueshare-updated`);
const log = require(`./log-to-queueshare`);
const monitor = require(`./monitor-queueshare`);
const processMessages = require(`./queueshare-process-messages`);
const serve = require(`./serve-queueshare`);

log(`Setting up...`);

process.on(`message`, (message) => {

    if (message === processMessages.restartConfirmation) {

        process.exit();

    }

});

const {folder, isDev} = JSON.parse(clArgs[0]);

const pkgPath = __dirname;

if (isDev) {

    monitor(pkgPath);

}
else {

    keepUpdated(pkgPath);

}

serve(folder);
