"use strict";

const assert = require(`assert`);
const CallbackArgs = require(`../callback-args`);
const express = require(`express`);
const ip = require(`ip`);
const multer = require(`multer`);
const path = require(`path`);
const UrlEncodedUuid = require(`../url-encoded-uuid`);
const uuid = require(`uuid`);

const apiPaths = require(`../qss-api-paths`);
const ClientFile = require(`../qsc-file`);
const ClientAssetFolder = require(`../qsc-asset-folder`);
const events = require(`../qss-events`);
const folderPaths = require(`../qss-folder-paths`);
const MediaKey = require(`../qsh-media-key`);
const SyncedState = require(`./SyncedState.js`);

const MediaFilename = (mediaKey) => mediaKey;

const pid = UrlEncodedUuid(uuid.v4());

const App = (folder, port, isDev) => {

    const app = express();

    app.use((req, res, next) => {

        events.emit(`usage`);

        next();

    });

    const clientFile = ClientFile(isDev);

    app.get(apiPaths.client, (req, res) => res.sendFile(clientFile));

    const clientAssetFolder = ClientAssetFolder(isDev);

    app.use(apiPaths.clientAssets, express.static(clientAssetFolder));

    const mediaDestination = path.join(folder, folderPaths.media);
    
    app.get(`${apiPaths.media}/:key`, (req, res) => {

        const key = MediaKey.Valid(req.params.key);

        res.sendFile(path.join(mediaDestination, MediaFilename(key)));

        // in the future, if the file doesn't exist but the key is 
        // for a youtube video or something else on the interweb, get the  
        // direct link using youtube-dl and res.redirect() to that link

        // also in the future, implement song playlist export using this route,
        // with additional options in the query

    });

    const upload = multer({storage: multer.diskStorage({

        destination: mediaDestination,

        filename: (req, file, callback) => callback(...CallbackArgs(() => {

            return MediaFilename(MediaKey.Valid(req.params.key));

        })),

        })}); 

    app.put(`${apiPaths.media}/:key`, upload.single(`file`), (req, res) => {

        res.end();

    });

    app.get(apiPaths.pid, (req, res) => res.json(pid));

    const syncedState = new SyncedState(folder);

    app.get(apiPaths.syncedStateChanges, (req, res) => {

        res.json(syncedState.ChangesSince(

            req.query.localVersion === undefined?

            undefined : JSON.parse(req.query.localVersion)

            ));

    });

    app.post(apiPaths.syncedStateChanges, express.json(), (req, res) => {

        syncedState.receive(req.body);

        res.end();

    });

    app.get(apiPaths.url, (req, res) => {

        res.json(`https://${ip.address()}:${port}`);

    });

    return app;

};

module.exports = App;
