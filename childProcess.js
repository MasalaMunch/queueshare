"use strict";

const anHourInMs = require(`./an-hour-in-ms`);
const CallbackArgs = require(`./callback-args`);
const clArgs = require(`./cl-args`);
const Defaultified = require(`./defaultified`);
const EscapedForRegex = require(`escape-string-regexp`);
const express = require(`express`);
const fs = require(`fs`);
const Interval = require(`./interval`);
const ip = require(`ip`);
const multer = require(`multer`);
const path = require(`path`);
const RandomPort = require(`./random-port`);
const StoredJson = require(`./stored-json`);

const apiPaths = require(`./qss-api-paths`);
const ClientAssetFolderPromise = require(`./qsc-asset-folder-promise`);
const ClientFile = require(`./qsc-file`);
const defaultConfig = require(`./default-qss-config`);
const folderPaths = require(`./qss-folder-paths`);
const log = require(`./log-to-qss`);
const MediaFilename = require(`./qss-media-filename`);
const MediaKey = require(`./qsh-media-key`);
const packageUpdater = require(`./qsp-updater`);
const pid = require(`./qss-pid`);
const restart = require(`./restart-qss`);
const SyncedState = require(`./synced-qss-state`);
const update = require(`./update-qss`);

(async () => {

    log(`Setting up...`);

    const config = Defaultified(JSON.parse(clArgs[0]), defaultConfig);

    const {folder, isDev, shouldUpdate} = config;

    const syncedState = new SyncedState(folder);

    // in the future, on synced state change, when media is referenced, 
    // check if it exists and if it doesn't, try downloading it

    const doMaintenance = () => {

        update();

        syncedState.compress();

        //TODO delete dereferenced media

    };

    const maintenanceInterval = new Interval(doMaintenance, anHourInMs);

    const app = express();

    app.use((req, res, next) => {

        maintenanceInterval.reset();

        next();

    });

    const clientFile = ClientFile(isDev);

    app.get(apiPaths.client, (req, res) => res.sendFile(clientFile));

    const clientAssetFolder = await ClientAssetFolderPromise(isDev);

    app.use(apiPaths.clientAssets, express.static(clientAssetFolder));

    const storedPortPath = path.join(folder, folderPaths.port);

    const storedPort = new StoredJson(storedPortPath);

    const storedPortValue = storedPort.Value();

    const port = storedPortValue === undefined? RandomPort() : storedPortValue;

    const ClientUrl = (ipAddress = ip.address()) => {

        return `http://${ipAddress}:${port}${apiPaths.client}`;

    };

    app.get(apiPaths.clientUrl, (req, res) => res.json(ClientUrl()));

    app.get(apiPaths.isDev, (req, res) => res.json(isDev));

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

    app.get(apiPaths.syncedStateChanges, (req, res) => {

        const {localVersion} = req.query;

        res.json(

            localVersion === undefined?

            syncedState.Changes() 

            : syncedState.ChangesSince(Number(localVersion))

            );

    });

    app.post(apiPaths.syncedStateChanges, express.json(), (req, res) => {

        syncedState.receive(req.body);

        res.end();

    });

    const server = app.listen(port);

    server.on(`error`, (error) => {

        if (error.code === `EADDRINUSE`) {

            log(
                `It looks like there's already a QueueShare process serving`
                + ` "${folder}". Multiple processes serving the same data can`
                + ` cause errors and data corruption, so this process will be`
                + ` terminated. If you're certain that no other processes are`
                + ` serving this data, delete "${storedPortPath}" and try`
                + ` again.`
                );

            process.exit();

        }

        throw error;

    });

    server.once(`listening`, () => {

        fs.mkdirSync(folder, {recursive: true});

        doMaintenance();

        maintenanceInterval.set();

        storedPort.write(port);

        log(`QueueShare is now available at ${ClientUrl(`localhost`)}`);

    });

    if (isDev) {

        const PackageWatcher = require(`./qsp-watcher`);

        const clientAssetFolderRegex = new RegExp(

            `^` + EscapedForRegex(path.resolve(clientAssetFolder))

            );

        PackageWatcher().on(`all`, (type, path) => {

            if (!clientAssetFolderRegex.test(path)) {

                restart(`A change was detected.`);

            }

        });

    }
    else if (shouldUpdate) {

        await packageUpdater.tryUpdating();

        update();

        Interval.set(() => packageUpdater.tryUpdating(), anHourInMs);

    }

})();
