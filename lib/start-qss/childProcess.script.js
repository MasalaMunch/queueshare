"use strict";

const CallbackArgs = require(`../callback-args`);
const clArgs = require(`../cl-args`);
const compression = require(`compression`);
const Defaulted = require(`../defaulted`);
const Delay = require(`../delay`);
const EscapedForRegex = require(`../escaped-for-regex`);
const express = require(`express`);
const fs = require(`fs`);
const FsJson = require(`../fs-json`);
const ip = require(`ip`);
const multer = require(`multer`);
const path = require(`path`);
const Port = require(`../port`);

const ClientAssetFolderPromise = require(`../qsc-asset-folder-promise`);
const clientFile = require(`../qsc-file`);
const defaultConfig = require(`../default-qss-config`);
const eventuallyRestart = require(`./eventuallyRestart.js`);
const eventuallyTryUpdating = require(`./eventuallyTryUpdating.js`);
const log = require(`../log-to-qss`);
const MediaFilename = require(`./MediaFilename.js`);
const MediaKey = require(`../qsh-media-key`);
const PackageJson = require(`../qsp-json`);
const packageUpdater = require(`./packageUpdater.js`);
const pid = require(`./pid.js`);
const requireNodeVersion = require(`./requireNodeVersion.js`);
const restartMsg = require(`./restartMsg.js`);
const SyncedState = require(`./SyncedState.js`);

(async () => {

    requireNodeVersion(`10.12.0`);

    log(`Setting up...`);

    const config = Defaulted(JSON.parse(clArgs[0]), defaultConfig);

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

            syncedState.fsChangeLog.write(syncedState.Changes());

            //TODO delete dereferenced media        

        }, Delay.oneHour);

    };

    const emitActivityMiddleware = (req, res, next) => {

        setMaintenanceInterval();

        next();

    };

    const app = express();

    app.use(compression());

    app.get(``, emitActivityMiddleware, (req, res) => res.sendFile(clientFile));

    const clientAssetFolder = await ClientAssetFolderPromise(isDev);

    app.use(`/clientAssets`, express.static(clientAssetFolder, {index: false}));

    const fsPortPath = path.join(folder, `port`);

    const fsPort = new FsJson(fsPortPath);

    let port;

    try {

        port = Port.Valid(fsPort.Value());

    } catch (error) {

        port = Port();

    }

    const ClientUrl = (ipAddress) => `http://${ipAddress}:${port}`;

    app.get(`/clientUrl`, (req, res) => res.json(ClientUrl(ip.address())));

    const mediaDestination = path.join(folder, `media`);
    
    app.get(`/media/:key`, (req, res) => {

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

        `/media/:key`, 

        emitActivityMiddleware,

        upload.single(`file`), 

        (req, res) => res.end(),

        );

    app.get(`/pid`, (req, res) => res.json(pid));

    app.get(`/syncedState/changes`, (req, res) => {

        res.json(

            pid === req.query.pid?

            syncedState.ChangesSince(

                Number(req.query.localVersion), 

                Number(req.query.limit),

                )

            : null

            );

    });

    app.post(

        `/syncedState/changes`, 

        emitActivityMiddleware, 

        express.json(), 

        (req, res) => {

            syncedState.receive(req.body);

            res.end();

        },

        );

    const {version} = PackageJson();

    app.get(`/version`, (req, res) => res.json(version));

    const server = app.listen(port);

    server.setTimeout(0); // i.e. no timeout

    server.on(`error`, (error) => {

        if (error.code === `EADDRINUSE`) {

            log(
                `It looks like there's already a QueueShare process serving`
                + ` "${folder}". Multiple processes serving the same data can`
                + ` cause errors and data corruption, so this process will be`
                + ` terminated. If you're certain that no other processes are`
                + ` serving this data, delete "${fsPortPath}" and try`
                + ` again.`
                );

            process.exit();

        }

        throw error;

    });

    server.once(`listening`, () => {

        fs.mkdirSync(folder, {recursive: true});

        syncedState.write({path: [], value: syncedState.Value()}, true);

        syncedState.fsChangeLog.write(syncedState.Changes());

        setMaintenanceInterval();

        fsPort.write(port);

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
