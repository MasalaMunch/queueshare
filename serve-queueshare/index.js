"use strict";

const assert = require(`assert`);
const express = require(`express`);
const fs = require(`fs`);
const HashedString = require(`string-hash`);
const IntWrapper = require(`../int-wrapper`);
const path = require(`path`);
const requireNodeVersion = require(`../require-node-version`);
const portRange = require(`../port-range`);
const UrlEncodedUuid = require(`../url-encoded-uuid`);
const UuPathId = require(`../uu-path-id`);
const UuProcessId = require(`../uu-process-id`);

const log = require(`../log-to-queueshare`);
const Paths = require(`.Paths.js`);
const SyncedState = require(`./SyncedState.js`);

requireNodeVersion(`10.12.0`); // so that recursive mkdir is supported

const processId = UrlEncodedUuid(UuProcessId());

module.exports = (dir) => {

    const paths = Paths(dir);

    fs.mkdirSync(dir, {recursive: true});

    const id = UrlEncodedUuid(UuPathId(paths.id));

    const port = IntWrapper(...portRange)(HashedString(UuPathId(paths.port)));

    const syncedState = new SyncedState(paths.syncedState);

    syncedState.compressStorage();

    const server = express();

    server.use(express.json());

    server.route(`/id`).get((request, response) => {

        response.json(id);

    });

    server.route(`/processId`).get((request, response) => {

        response.json(processId);

    });

    server.route(`/syncedState/changes`).get((request, response) => {

        let {localVersion, limit} = request.query;

        if (localVersion !== undefined) {

            localVersion = JSON.parse(localVersion);

        }

        if (limit === undefined) {

            limit = Infinity;

        }
        else {

            limit = Number(limit);

            assert(!isNaN(limit));

        }

        limit = Math.min(limit, 1000);

        const changes = [];

        for (const c of syncedState.ChangesSince(localVersion)) {

            if (changes.length >= limit) {

                break;

            }

            changes.push(c);

        }

        response.json(changes);

    });

    server.route(`/syncedState/changes`).post((request, response) => {

        syncedState.receive(request.body);

        response.end();

    });

    server.route(`/`).get((request, response) => {

        response.sendFile(path.join(__dirname, `index.html`));

    });

    server.listen(port, () => {

        log(`QueueShare is now available at http://localhost:${port}`);

    }).on(`error`, (error) => {

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
