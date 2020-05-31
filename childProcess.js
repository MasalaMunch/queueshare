"use strict";

const clArgs = require(`./cl-args`);
const Defaultified = require(`./defaultified`);
const fs = require(`fs`);
const path = require(`path`);
const RandomPort = require(`./random-port`);
const StoredJson = require(`./stored-json`);

const apiPaths = require(`./qss-api-paths`);
const App = require(`./qss-app`);
const folderPaths = require(`./qss-folder-paths`);
const defaultConfig = require(`./default-qss-config`);
const events = require(`./qss-events`);
const keepUpdated = require(`./keep-qss-updated`);
const log = require(`./log-to-qss`);
const processMessages = require(`./qss-process-messages`);

const {isDev, folder} = Defaultified(JSON.parse(clArgs[0]), defaultConfig);

process.on(`message`, (message) => {

    if (message === processMessages.restartConfirmation) {

        process.exit();

    }

});

log(`Setting up...`);

if (isDev) {

    const monitor = require(`./monitor-qss`);

    monitor();

}
else {

    keepUpdated();

}

const storedPortPath = path.join(folder, folderPaths.port);

const storedPort = new StoredJson(storedPortPath);

const storedPortValue = storedPort.Value();

const port = storedPortValue === undefined? RandomPort() : storedPortValue;

const server = App(folder, port, isDev).listen(port);

server.on(`error`, (error) => {

    if (error.code === `EADDRINUSE`) {

        log(
            `It looks like there's already a QueueShare process serving`
            + ` "${folder}". Multiple processes serving the same data can cause`
            + ` errors and data corruption, so this process will be terminated.`
            + ` If you're sure that no other processes are serving this data,`
            + ` data, delete "${storedPortPath}" and try again.`
            );

        process.exit();

    }

    throw error;

});

server.once(`listening`, () => {

    fs.mkdirSync(folder, {recursive: true});

    storedPort.write(port);

    process.nextTick(() => events.emit(`folderIsReady`));

});

events.once(`setupIsComplete`, () => {

    log(
        `QueueShare is now available at`
        + ` http://localhost:${port}${apiPaths.client}`
        );

});
