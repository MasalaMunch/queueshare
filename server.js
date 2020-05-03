#!/usr/bin/env node

"use strict";

const assert = require(`assert`);
const {dir, port} = require(`./command.js`);
const express = require(`express`);
const SyncedJsonTree = require(`synced-json-tree`);
const urlEncodedUupid = require(`url-encoded-uupid`);

const syncedState = new SyncedJsonTree();

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

    syncedState.receive(request.body);

    response.end();

});

console.log(`Starting server...`);

server.listen(port, () => {

    console.log(`QueueShare is now available at http://localhost:${port}`);

});

(() => {

    const sjt = new SyncedJsonTree();

    sjt.write({path: [`your mom`], value: `ugly`});

    console.log(JSON.stringify([...sjt.Changes()][0]));

})();

module.exports = server;
