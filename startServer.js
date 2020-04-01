#!/usr/bin/env node

"use strict";

const path = require(`path`);

const [directory, port] = (() => {

    // parse command line input

    const {program} = require(`commander`);

    program.version(require(`./package.json`).version, `-v|--version`);

    program.option(
        `-d|--dir <directory>`, 
        `where the queue will be stored`, 
        path.join(require('os').homedir(), `queueshare`),
        );

    program.option(
        `-p|--port <port>`, 
        `where the queue will be served`, 
        String(42069),
        );

    program.parse(process.argv);  

    return [program.dir, Number(program.port)];

})();

const syncedState = (() => {

    console.log(`Opening the database...`);

    const fs = require(`fs`);

    fs.mkdirSync(directory, {recursive: true});

    const syncedStateDirectory = path.join(directory, `syncedState`);

    fs.mkdirSync(syncedStateDirectory, {recursive: true});

    return new (require(`./SyncedServerState.js`))({

        storedJsonLog: new (require(`./StringLogViaFile.js`))({

            path: path.join(syncedStateDirectory, `jsonLog`),
            separator: `\n`,

            }),

        });

})();

(() => {

    console.log(`Starting the server...`);

    const app = require(`express`)();

    app.get(`/`, (request, response) => {

        response.send(`QueueShare!`);

    });

    const syncedStateRoute = app.route(`/syncedState`);

    const AsJson = require(`./AsJson.js`);

    syncedStateRoute.get((request, response) => {

        const version = Number(request.query.version);

        response.send(AsJson({

            changes: syncedState.ChangesSince(version),

            version: syncedState.CurrentVersion(),

            }));

    });

    //TODO next up figure out server id system

    syncedStateRoute.put((request, response) => {

        const changesAsJson = request.query.changesAsJson;

        syncedState.write(changesAsJson);

        response.end();

    });

    app.listen(port, () => {

        console.log(`QueueShare is now available at http://localhost:${port}`);

    });

})();
