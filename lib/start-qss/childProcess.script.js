"use strict";

const anHourDelay = require(`../an-hour-delay`);
const CallbackArgs = require(`../callback-args`);
const clArgs = require(`../cl-args`);
const compression = require(`compression`);
const Defined = require(`../defined`);
const EscapedForRegex = require(`escape-string-regexp`);
const express = require(`express`);
const fs = require(`fs`);
const Interval = require(`../interval`);
const ip = require(`ip`);
const multer = require(`multer`);
const path = require(`path`);
const Port = require(`../port`);
const StoredJson = require(`../stored-json`);

const apiPaths = require(`../qss-api-paths`);
const badPidStatus = require(`../qss-bad-pid-status`);
const ClientAssetFolderPromise = require(`../qsc-asset-folder-promise`);
const ClientFile = require(`../qsc-file`);
const defaultConfig = require(`../default-qss-config`);
const eventuallyRestart = require(`./eventuallyRestart.js`);
const folderPaths = require(`./folderPaths.js`);
const log = require(`../log-to-qss`);
const MediaFilename = require(`./MediaFilename.js`);
const MediaKey = require(`../qsh-media-key`);
const packageUpdater = require(`./packageUpdater.js`);
const pid = require(`./pid.js`);
const SyncedState = require(`./SyncedState.js`);
const update = require(`./update.js`);

(async () => {

    log(`Setting up...`);

    const config = Defined(JSON.parse(clArgs[0]), defaultConfig);

    const {folder, isDev, shouldUpdate} = config;

    const syncedState = new SyncedState(folder);

    // in the future, on synced state change, when media is referenced, check if 
    // it exists and if it doesn't, try downloading it

    const doMaintenance = () => {

        update();

        syncedState.compress();

        //TODO delete dereferenced media        

    };

    const maintenanceInterval = new Interval(doMaintenance, anHourDelay);

    const emitActivityMiddleware = (req, res, next) => {

        maintenanceInterval.set();

        next();

    };

    const app = express();

    app.use(compression());

    const clientFile = ClientFile(isDev);

    app.get(apiPaths.client, emitActivityMiddleware, (req, res) => {

        res.sendFile(clientFile);

    });

    const clientAssetFolder = await ClientAssetFolderPromise(isDev);

    app.use(apiPaths.clientAssets, express.static(clientAssetFolder, {

        index: false,

    }));

    const storedPortPath = path.join(folder, folderPaths.port);

    const storedPort = new StoredJson(storedPortPath);

    const storedPortValue = storedPort.Value();

    let port;

    if (storedPortValue === undefined) {

        port = Port();

    }
    else {

        try {

            port = Port.Valid(storedPortValue);

        } catch (error) {

            log(error);

            port = Port();

        }

    }

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

    app.put(

        `${apiPaths.media}/:key`, 

        emitActivityMiddleware,

        upload.single(`file`), 

        (req, res) => res.end(),

        );

    app.get(apiPaths.pid, (req, res) => res.json(pid));

    app.get(apiPaths.syncedStateChanges, (req, res) => {

        if (pid === req.query.pid) {

            res.json(syncedState.ChangesSince(

                Number(req.query.localVersion), 

                Number(req.query.limit),

                ));      

        }
        else {

            res.status(badPidStatus).end();

        }

    });

    app.post(

        apiPaths.syncedStateChanges, 

        emitActivityMiddleware, 

        express.json(), 

        (req, res) => {

            syncedState.receive(req.body);

            res.end();

        },

        );

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

        const PackageWatcher = require(`./PackageWatcher.js`);

        const clientAssetFolderRegex = new RegExp(

            `^` + EscapedForRegex(path.resolve(clientAssetFolder))

            );

        PackageWatcher().on(`all`, (type, path) => {

            if (!clientAssetFolderRegex.test(path)) {

                eventuallyRestart(`A change was detected.`);

            }

        });

    }
    else if (shouldUpdate) {

        await packageUpdater.tryUpdating();

        update();

        Interval.set(() => packageUpdater.tryUpdating(), anHourDelay);

    }

})();
