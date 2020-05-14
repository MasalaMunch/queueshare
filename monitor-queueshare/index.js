"use strict";

const chokidar = require(`chokidar`);

const log = require(`../log-to-queueshare`);
const processMessages = require(`../queueshare-process-messages`);

const monitorQueueshare = (pkgPath) => {

    const watcher = chokidar.watch(pkgPath, {

        ignored: [/(^|[\/\\])\../, /(^|[\/\\])node_modules/],

        ignoreInitial: true,

    });

    watcher.on(`all`, () => {

        log(`A change was detected. Restarting...`);

        process.send(processMessages.restartCommand);

    });

};

module.exports = monitorQueueshare;
