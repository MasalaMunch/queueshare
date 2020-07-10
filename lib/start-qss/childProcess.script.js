"use strict";

const CallbackArgs = require(`../callback-args`);
const chokidar = require(`chokidar`);
const clArgs = require(`../cl-args`);
const compression = require(`compression`);
const cookieParser = require(`cookie-parser`);
const Defaulted = require(`../defaulted`);
const Delay = require(`../delay`);
const express = require(`express`);
const fs = require(`fs`);
const FsJson = require(`../fs-json`);
const ip = require(`ip`);
const logp = require(`../logp`);
const multer = require(`multer`);
const mustache = require(`mustache`);
const path = require(`path`);
const Port = require(`../port`);

const clientAssetFolder = require(`../qsc-asset-folder`);
const clientCss = require(`../qsc-css`);
const ClientJsPromise = require(`../qsc-js-promise`);
const clientTemplate = require(`../qsc-template`);
const ClientTheme = require(`../qsc-theme`);
const defaultConfig = require(`../default-qss-config`);
const eventuallyRestart = require(`./eventuallyRestart.js`);
const eventuallyUpdateIfPackageHasBeenUpdated = require(`./eventuallyUpdateIfPackageHasBeenUpdated.js`);
const MediaFilename = require(`./MediaFilename.js`);
const MediaKey = require(`../qsh-media-key`);
const packageFolder = require(`../qsp-folder`);
const PackageJson = require(`../qsp-json`);
const packageUpdater = require(`./packageUpdater.js`);
const pid = require(`./pid.js`);
const requireNodeVersion = require(`./requireNodeVersion.js`);
const restartMsg = require(`./restartMsg.js`);
const SyncedState = require(`./SyncedState.js`);

(async () => {

    logp(`Setting up...`);

    requireNodeVersion(`10.12.0`);

    const config = Defaulted(JSON.parse(clArgs[0]), defaultConfig);

    const {folder, isDev, shouldUpdate} = config;

    const syncedState = new SyncedState(folder);

    // in the future, on synced state change, when media is referenced, check if 
    // it exists and if it doesn't, try downloading it

    let maintenanceIntervalId;

    const doMaintenance = (isStart = false) => {

        eventuallyUpdateIfPackageHasBeenUpdated();

        if (isStart) {

            syncedState.write({path: [], value: syncedState.Value()}, true);

        }

        syncedState.fsChangeLog.write(syncedState.Changes());

        if (syncedState.ChangeCount() > 1000) {

            logp(`The database needs maintenance.`, restartMsg);

            eventuallyRestart();

        }

        //TODO delete dereferenced media        

    };

    const resetMaintenanceInterval = () => {

        clearInterval(maintenanceIntervalId);

        maintenanceIntervalId = setInterval(doMaintenance, Delay.oneHour);

    };

    const emitActivityMiddleware = (req, res, next) => {

        resetMaintenanceInterval();

        next();

    };

    const app = express();

    app.use(compression());

    const clientJs = await ClientJsPromise();

    const fsPortPath = path.join(folder, `port`);

    const fsPort = new FsJson(fsPortPath);

    let port;

    try {

        port = Port.Valid(fsPort.Value());

    } catch (error) {

        port = Port();

    }

    const ClientUrl = (ipAddress) => `http://${ipAddress}:${port}`;

    const {version} = PackageJson();

    app.get(``, emitActivityMiddleware, cookieParser(), (req, res) => {

        let theme;

        try {

            theme = ClientTheme.Valid(req.cookies.theme);

        } catch (error) {

            theme = ClientTheme.default;

        }

        res.send(mustache.render(clientTemplate, {

            css: clientCss,

            js: clientJs,

            serverPid: pid,

            syncedStateChangesString: JSON.stringify(syncedState.Changes()),

            url: ClientUrl(ip.address()),

            theme,

            version,

            }));

    });

    app.use(`/clientAssets`, express.static(clientAssetFolder, {index: false}));

    const mediaFolder = path.join(folder, `media`);
    
    app.get(`/media/:key`, emitActivityMiddleware, (req, res) => {

        const key = MediaKey.Valid(req.params.key);

        res.sendFile(path.join(mediaFolder, MediaFilename(key)));

        // in the future, if the file doesn't exist but the key is 
        // for a youtube video or something else on the interweb, get the  
        // direct link using youtube-dl and res.redirect() to that link

        // also in the future, implement song playlist export using this route,
        // with additional options in the query

    });

    const upload = multer({storage: multer.diskStorage({

        destination: mediaFolder,

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

    app.post(`/pid`, emitActivityMiddleware, (req, res) => {

        logp(`A client requested a restart.`, restartMsg);

        eventuallyRestart();

        res.end();

    });

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

    app.post(`/version`, emitActivityMiddleware, async (req, res) => {

        await packageUpdater.try();

        eventuallyUpdateIfPackageHasBeenUpdated();

        res.json(packageUpdater.hasUpdated);

    });

    const server = app.listen(port);

    server.setTimeout(0); // i.e. no timeout

    server.on(`error`, (error) => {

        if (error.code === `EADDRINUSE`) {

            logp(
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

        fs.mkdirSync(mediaFolder, {recursive: true});

        syncedState.startEmitting();

        doMaintenance(true);

        resetMaintenanceInterval();

        fsPort.write(port);

        logp(`QueueShare is now available at ${ClientUrl(`localhost`)}`);

    });

    if (isDev) {

        const packageWatcher = chokidar.watch(packageFolder, {

            ignored: [

                /(^|[\/\\])\../, 

                /(^|[\/\\])node_modules/,

                ],

            ignoreInitial: true,

            });

        packageWatcher.on(`all`, () => {

            logp(`A change was detected.`, restartMsg);

            eventuallyRestart();

        });

    }
    else if (shouldUpdate) {

        await packageUpdater.try();

        eventuallyUpdateIfPackageHasBeenUpdated();

        packageUpdater.setTryInterval();

    }

})();
