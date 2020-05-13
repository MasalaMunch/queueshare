"use strict";

const assert = require(`assert`);
const express = require(`express`);
const fs = require(`fs`);
const HashedString = require(`string-hash`);
const IntWrapper = require(`../int-wrapper`);
const ip = require(`ip`);
const path = require(`path`);
const portRange = require(`../port-range`);
const requireNode = require(`../require-node`);
const UrlEncodedUuid = require(`../url-encoded-uuid`);
const UuPathId = require(`../uu-path-id`);
const UuProcessId = require(`../uu-process-id`);

const log = require(`../log-to-queueshare`);
const Paths = require(`./Paths.js`);
const routes = require(`./routes.js`);
const serveSyncedState = require(`./serveSyncedState.js`);
const SyncedState = require(`./SyncedState.js`);

requireNode(`10.12.0`); // so that recursive mkdir is supported

const processId = UrlEncodedUuid(UuProcessId());

const serveQueueshare = (dir) => {

    const app = express();

    const htmlPath = path.join(__dirname, `index.html`);

    app.route(routes.ui).get((req, res) => res.sendFile(htmlPath));

    fs.mkdirSync(dir, {recursive: true});

    const paths = Paths(dir);

    const id = UrlEncodedUuid(UuPathId(paths.id));

    app.get(routes.id, (req, res) => res.json(id));

    app.get(routes.ipAddress, (req, res) => res.json(ip.address()));

    app.get(routes.processId, (req, res) => res.json(processId));

    const syncedState = new SyncedState(paths.syncedState);

    serveSyncedState(app, syncedState);

    const port = IntWrapper(...portRange)(HashedString(UuPathId(paths.port)));

    const server = app.listen(port);

    server.on(`listening`, () => {

        log(
            `QueueShare is now available at`
            + ` http://localhost:${port}${routes.ui}`
            );

    });

    server.on(`error`, (error) => {

        if (error.code === `EADDRINUSE`) {

            log(
                `There's already a queueshare process serving "${dir}".`
                + ` Multiple processes serving the same data can cause errors`
                + ` and data corruption, so this process will be terminated. If` 
                + ` you're certain that there are no other processes serving`
                + ` this data, delete "${paths.port}" and try again.`
                );

            process.exit();

        }

        throw error;

    });

};

module.exports = serveQueueshare;
