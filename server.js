#!/usr/bin/env node

"use strict";

const assert = require(`assert`);
const {dir, port} = require(`./command.js`);
const express = require(`express`);
const Path = require(`path`);
const JsonLogViaFile = require(`json-log-via-file`);
const SyncedJsonTree = require(`synced-json-tree`);
const urlEncodedUupid = require(`url-encoded-uupid`);

const syncedState = new SyncedJsonTree();

const syncedStateStorage = new JsonLogViaFile({

    dir: Path.join(dir, `syncedState`, `jsonLog`),

    });

for (const {changes} of syncedStateStorage.Entries()) {

    for (const c of changes) {

        syncedState.restore(c);

    }

}

syncedStateStorage.clear();

syncedStateStorage.addToWriteQueue({

    changes: Array.from(syncedState.Changes()),

    });

const server = express();

server.use(express.json());

server.route(`/pid`).get((request, response) => {

    response.json(urlEncodedUupid);

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

    const localVersion = syncedState.LocalVersion();

    syncedState.receive(request.body);

    const changes = Array.from(syncedState.ChangesSince(localVersion));

    if (changes.length > 0) {

        syncedStateStorage.addToWriteQueue({changes});

    }

    response.end();

});

console.log(`Starting server...`);

server.listen(port, () => {

    console.log(`QueueShare is now available at http://localhost:${port}`);

});
