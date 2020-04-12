#!/usr/bin/env node

"use strict";

//TODO separate this into multiple files and bring back index.js

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

    const SyncedServerState = require(`./SyncedServerState.js`);

    const StringLogViaFile = require(`./StringLogViaFile.js`);

    return new SyncedServerState({

        storedJsonLog: new StringLogViaFile({

            path: path.join(syncedStateDirectory, `jsonLog`),
            separator: `\n`,

            }),

        });

})();

(() => {

    console.log(`Starting the server...`);

    const app = require(`express`)();

    const syncedStateRoute = app.route(`/syncedState`);

    syncedStateRoute.get((request, response) => {

        response.set(`Content-Type`, `text/plain`);

        response.send(JSON.stringify({

            changesAsJson: JSON.stringify(
                syncedState.ChangesSince(Number(request.query.version))
                ),

            version: syncedState.CurrentVersion(),

            }));

    });

    syncedStateRoute.put(require(`body-parser`).text(), (request, response) => {

        try {

            syncedState.write(request.body);

        } catch (error) {

            response.status(400);

        }

        response.end();

    });

    app.listen(port, () => {

        console.log(`QueueShare is now available at http://localhost:${port}`);

    });

})();
