"use strict";

const assert = require(`assert`);
const CallbackArgs = require(`../callback-args`);
const clArgs = require(`../cl-args`);
const compression = require(`compression`);
const Defined = require(`../defined`);
const Delay = require(`../delay`);
const EscapedForRegex = require(`../escaped-for-regex`);
const express = require(`express`);
const fs = require(`fs`);
const ip = require(`ip`);
const multer = require(`multer`);
const nodeVersion = require(`../node-version`);
const path = require(`path`);
const Port = require(`../port`);
const semver = require(`semver`);
const StoredJson = require(`../stored-json`);

const apiPaths = require(`../qss-api-paths`);
const ClientAssetFolderPromise = require(`../qsc-asset-folder-promise`);
const ClientFile = require(`../qsc-file`);
const defaultConfig = require(`../default-qss-config`);
const eventuallyRestart = require(`./eventuallyRestart.js`);
const eventuallyTryUpdating = require(`./eventuallyTryUpdating.js`);
const log = require(`../log-to-qss`);
const MediaFilename = require(`./MediaFilename.js`);
const MediaKey = require(`../qsh-media-key`);
const PackageJson = require(`../qsp-json`);
const packageUpdater = require(`./packageUpdater.js`);
const pid = require(`./pid.js`);
const requiredNodeVersion = require(`./requiredNodeVersion.js`);
const restartMsg = require(`./restartMsg.js`);
const SyncedState = require(`./SyncedState.js`);

(async () => {

    if (semver.lt(nodeVersion, requiredNodeVersion)) {

        log(
            `QueueShare requires Node.js version ${requiredNodeVersion} or`
            + ` greater. You're using version ${nodeVersion}. To get a newer`
            + ` version, visit https://nodejs.org/en/download`
            );

        process.exit();

    }

    log(`Setting up...`);

    const config = Defined(JSON.parse(clArgs[0]), defaultConfig);

    const {folder, isDev, shouldUpdate} = config;

    const syncedState = new SyncedState(folder);

    // in the future, on synced state change, when media is referenced, check if 
    // it exists and if it doesn't, try downloading it

    let maintenanceIntervalId;

    const setMaintenanceInterval = () => {

        clearInterval(maintenanceIntervalId);

        maintenanceIntervalId = setInterval(() => {

            eventuallyTryUpdating();

            if (syncedState.ChangeCount() > 1000) {

                log(`The database needs maintenance.`, restartMsg);

                eventuallyRestart();

            }

            syncedState.storedChanges.write(syncedState.Changes());

            //TODO delete dereferenced media        

        }, Delay.oneHour);

    };

    const emitActivityMiddleware = (req, res, next) => {

        setMaintenanceInterval();

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

    const storedPortPath = path.join(folder, `port`);

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

    const ClientUrl = (ipAddress) => {

        return `http://${ipAddress}:${port}${apiPaths.client}`;

    };

    app.get(apiPaths.clientUrl, (req, res) => {

        res.json(ClientUrl(ip.address()));

    });

    const mediaDestination = path.join(folder, `media`);
    
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

        assert(pid === req.query.pid);

        res.json(syncedState.ChangesSince(

            Number(req.query.localVersion), 

            Number(req.query.limit),

            ));

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

    const {version} = PackageJson();

    app.get(apiPaths.version, (req, res) => res.json(version));

    const server = app.listen(port);

    server.setTimeout(0); // no timeout

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

        syncedState.write({path: [], value: syncedState.Value()}, true);

        syncedState.storedChanges.write(syncedState.Changes());

        setMaintenanceInterval();

        storedPort.write(port);

        log(`QueueShare is now available at ${ClientUrl(`localhost`)}`);

    });

    if (isDev) {

        const chokidar = require(`chokidar`);

        const packageFolder = require(`../qsp-folder`);

        const packageWatcher = chokidar.watch(packageFolder, {

            ignored: [

                /(^|[\/\\])\../, 

                /(^|[\/\\])node_modules/,

                new RegExp(

                    `^` + EscapedForRegex(path.resolve(clientAssetFolder))

                    ),

                ],

            ignoreInitial: true,

            });

        packageWatcher.on(`all`, (type, path) => {

            log(`A change was detected.`, restartMsg);

            eventuallyRestart();

        });

    }
    else if (shouldUpdate) {

        await packageUpdater.tryUpdating();

        eventuallyTryUpdating();

        packageUpdater.setInterval();

    }

})();
