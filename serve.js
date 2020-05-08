"use strict";

const assert = require(`assert`);
const express = require(`express`);
const fs = require(`fs`);
const lock = require(`./lock.js`);
const log = require(`./log.js`);
const path = require(`path`);
const Paths = require(`./Paths.js`);
const requireNodeVersion = require(`require-node-version`);
const UrlEncodedUuid = require(`url-encoded-uuid`);
const UuDeviceId = require(`uu-device-id`);
const UuProcessId = require(`uu-process-id`);
const SyncedServerState = require(`./SyncedServerState.js`);

requireNodeVersion(`10.12.0`); // so that recursive mkdir is supported

const processId = UrlEncodedUuid(UuProcessId());

module.exports = (dir, port) => {

    fs.mkdirSync(dir, {recursive: true});

    lock(dir);

    const {deviceIdFile, syncedStateFile} = Paths(dir);

    const deviceId = UrlEncodedUuid(UuDeviceId(deviceIdFile));

    const syncedState = new SyncedServerState({file: syncedStateFile});

    const server = express();

    server.use(express.json());

    server.route(`/processId`).get((request, response) => {

        response.json(processId);

    });

    server.route(`/deviceId`).get((request, response) => {

        response.json(deviceId);

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

        limit = Math.min(limit, 100);

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

        response.sendFile(path.resolve(`index.html`));

    });

    server.listen(port, () => {

        log(`QueueShare is now available at http://localhost:${port}`);

    });

};
