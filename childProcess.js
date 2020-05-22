"use strict";

const clArgs = require(`./cl-args`);
const fs = require(`fs`);
const Obj = require(`./obj`);
const path = require(`path`);

const App = require(`./qss-app`);
const events = require(`./qss-events`);
const keepUpdated = require(`./keep-qss-updated`);
const log = require(`./log-to-qss`);
const monitor = require(`./monitor-qss`);
const Port = require(`./qss-port`);
const processMessages = require(`./qss-process-messages`);
const routes = require(`./qss-routes`);

const {folder, isDev, shouldUpdate} = JSON.parse(clArgs[0]);

process.on(`message`, (message) => {

    if (message === processMessages.restartConfirmation) {

        process.exit();

    }

});

log(`Setting up...`);

if (isDev) {

    monitor();

}
else if (shouldUpdate) {

    keepUpdated();

}

const dataPaths = {

    media: `media`,

    port: `port`,

    syncedState: `syncedState`,

    };

Obj.transform(dataPaths, (relativePath) => path.join(folder, relativePath));

fs.mkdirSync(folder, {recursive: true});

const port = Port(dataPaths);

events.on(`setupCompletion`, () => {

    log(
        `QueueShare is now available at`
        + ` http://localhost:${port}${routes.client}`
        );

});

const server = App(dataPaths).listen(port);

server.on(`listening`, () => events.emit(`folderLockAcquisition`));

server.on(`error`, (error) => {

    if (error.code === `EADDRINUSE`) {

        log(
            `There's already a QueueShare process serving "${folder}".`
            + ` Multiple processes serving the same data can cause errors`
            + ` and data corruption, so this process will be terminated.`
            );

        process.exit();

    }

    throw error;

});
