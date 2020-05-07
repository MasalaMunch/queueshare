"use strict";

const clArgs = require(`cl-args`);
const defaultConfig = require(`./defaultConfig.js`);
const define = require(`define`);
const beforeExiting = require(`./beforeExiting.js`);
const processMessages = require(`./processMessages.js`);

const config = JSON.parse(clArgs[0]);

define(config, defaultConfig);

console.log(config);

beforeExiting(() => console.log(`cleaning up my mess ;)`));

process.on(`message`, (message) => {

    if (message === processMessages.restartConfirmation) {

        process.exit();

    } 

});

process.send(processMessages.restartCommand);

// const add = require(`add`);
// const assert = require(`assert`);
// const crash = require(`crash`);
// const express = require(`express`);
// const fs = require(`fs`);
// const open = require(`open`);
// const os = require(`os`);
// const Path = require(`path`);
// const {program} = require(`commander`);
// const Space = require(`scope`);
// const StoredJsonLog = require(`stored-json-log`);
// const SyncedJsonTree = require(`synced-json-tree`);
// const UrlEncodedUuid = require(`url-encoded-uuid`);
// const UuDeviceId = require(`uu-device-id`);
// const UuProcessId = require(`uu-process-id`);
// const {version} = require(`./package.json`);

// // get command line input:

// program.version(
//     version, 
//     `-v|--version`
//     );

// program.option(
//     `-d|--dir <dir>`, 
//     `where the queue will be stored`, 
//     Path.join(os.homedir(), `queueshareData`),
//     );

// program.option(
//     `-no|--no-open`,
//     `don't open QueueShare after setting it up`,
//     );

// program.option(
//     `-p|--port <port>`, 
//     `where the queue will be served`, 
//     String(42069),
//     );

// program.parse(process.argv);

// const dir = Path.resolve(program.dir);

// const shouldOpen = program.open;

// const port = Number(program.port);

// // show loading message:

// console.log(`\nSetting up...\n`);

// // create Path space

// const pathSpace = new Space();

// // lock dir:

// const lockFile = Path.join(dir, `lock`);

// pathSpace.reserve(lockFile);

// try {
    
//     fs.writeFileSync(lockFile, ``, {flag: `wx`});

// } catch (error) {

//     if (error.code === `EEXIST`) {

//         console.log(
//             `It looks like there's already a QueueShare process serving`
//             + ` "${dir}". Multiple processes serving the same data can`
//             + ` cause errors and data corruption, so this process will be` 
//             + ` terminated. If you're certain that there are no other`
//             + ` processes serving this data, delete "${lockFile}" and try`
//             + ` again.\n`
//             );

//         crash();

//     }
//     else {

//         throw error;

//     }

// }

// const releaseLock = () => fs.unlinkSync(lockFile);

// process.once(`SIGUSR2`, () => {

//     releaseLock();

//     process.kill(process.pid, 'SIGUSR2');

// });

// //TODO write when-nodemon-kills-me module and do whenNodemonKillsMe(releaseLock)

// //TODO fix double spacing when process restarts

// //TODO fix double-control-cx`   `

// // hiiiiiii

// // onExit(() => fs.unlinkSync(lockFile));

// // initialize pid and did:

// const pid = UrlEncodedUuid(UuProcessId());

// const did = UrlEncodedUuid(UuDeviceId({file: Path.join(dir, `did`)}));

// // initialize synced state:

// const syncedState = new SyncedJsonTree();

// add(syncedState, {

//     storage: new StoredJsonLog({file: Path.join(dir, `syncedState`)}),

//     });

// for (const {changes} of syncedState.storage.Entries()) {

//     for (const c of changes) {

//         syncedState.restore(c);

//     }

// }

// // compress synced state storage:

// syncedState.storage.clear();

// syncedState.storage.addToWriteQueue({

//     changes: Array.from(syncedState.Changes()),

//     });

// // initialize server:

// const server = express();

// server.use(express.json());

// server.route(`/pid`).get((request, response) => {

//     response.json(pid);

// });

// server.route(`/did`).get((request, response) => {

//     response.json(did);

// });

// server.route(`/syncedState/changes`).get((request, response) => {

//     let {localVersion, limit} = request.query;

//     if (localVersion !== undefined) {

//         localVersion = JSON.parse(localVersion);

//     }

//     if (limit === undefined) {

//         limit = Infinity;

//     }
//     else {

//         limit = Number(limit);

//         assert(!isNaN(limit));

//     }

//     limit = Math.min(limit, 100);

//     const changes = [];

//     for (const c of syncedState.ChangesSince(localVersion)) {

//         if (changes.length >= limit) {

//             break;

//         }

//         changes.push(c);

//     }

//     response.json(changes);

// });

// server.route(`/syncedState/changes`).post((request, response) => {

//     const localVersion = syncedState.LocalVersion();

//     syncedState.receive(request.body);

//     const changes = Array.from(syncedState.ChangesSince(localVersion));

//     if (changes.length > 0) {

//         syncedState.storage.addToWriteQueue({changes});

//     }

//     response.end();

// });

// server.listen(port, () => {

//     const url = `http://localhost:${port}`;

//     console.log(`QueueShare is now available at ${url}\n`);

//     if (shouldOpen) {

//         open(url);

//     }

// });
