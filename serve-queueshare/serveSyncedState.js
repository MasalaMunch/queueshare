"use strict";

const express = require(`express`);

const routes = require(`./routes.js`);

const serveSyncedState = (app, syncedState) => {

    app.post(routes.syncedStateChanges, express.json(), (req, res) => {

        syncedState.receive(req.body);

        res.end();

    });

    app.get(routes.syncedStateChanges, (req, res) => {

        let {localVersion, limit} = req.query;

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

        res.json(changes);

    });

};

module.exports = serveSyncedState;
