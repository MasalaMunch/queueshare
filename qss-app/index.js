"use strict";

const assert = require(`assert`);
const CallbackArgs = require(`../callback-args`);
const express = require(`express`);
const ip = require(`ip`);
const multer = require(`multer`);
const path = require(`path`);

const clientAssetFolder = require(`../qsc-asset-folder`);
const clientFile = require(`../qsc-file`);
const events = require(`../qss-events`);
const MediaFilename = require(`./MediaFilename.js`);
const processId = require(`./processId.js`);
const routes = require(`../qss-routes`);
const SyncedState = require(`./SyncedState.js`);

const App = (dataPaths) => {

    const app = express();

    app.use((req, res, next) => {

        events.emit(`usage`);

        next();

    });

    app.get(routes.client, (req, res) => res.sendFile(clientFile));

    app.use(routes.clientAssets, express.static(clientAssetFolder));

    app.get(routes.ipAddress, (req, res) => res.json(ip.address()));

    const MediaDestination = (key) => dataPaths.media;

    app.get(`${routes.media}/:key`, (req, res) => {

        const {key} = req.params;

        res.sendFile(path.join(MediaDestination(key), MediaFilename(key)));

        // in the future, if the file doesn't exist but the key is 
        // for a youtube video or something else on the interweb, get the  
        // direct link using youtube-dl and res.redirect() to that link

        // also in the future, implement song playlist export using this route,
        // with additional options in the query

    });

    const upload = multer({storage: multer.diskStorage({

        destination: (req, file, callback) => {

            callback(...CallbackArgs(() => MediaDestination(req.params.key)));

        },

        filename: (req, file, callback) => {

            callback(...CallbackArgs(() => MediaFilename(req.params.key)))

        },

        })}); 

    app.put(`${routes.media}/:key`, upload.single(`file`), (req, res) => {

        res.end();

    });

    app.get(routes.processId, (req, res) => res.json(processId));

    const syncedState = new SyncedState(dataPaths);

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

        limit = Math.min(limit, 100);

        const changes = [];

        for (const c of syncedState.ChangesSince(localVersion)) {

            if (changes.length >= limit) {

                break;

            }

            changes.push(c);

        }

        res.json(changes);

    });

    app.post(routes.syncedStateChanges, express.json(), (req, res) => {

        syncedState.receive(req.body);

        res.end();

    });

    return app;

};

module.exports = App;
