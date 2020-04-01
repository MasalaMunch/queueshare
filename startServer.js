#!/usr/bin/env node

"use strict";

const commanderProgram = require(`commander`).program;

commanderProgram.version(require(`./package.json`).version, `-v|--version`);

commanderProgram.option(
    `-d|--dir <directory>`, 
    `where the queue will be stored`, 
    `~/queueshare`,
    );

commanderProgram.option(
    `-p|--port <port>`, 
    `where the queue will be served`, 
    String(42069),
    );

commanderProgram.parse(process.argv);

const directory = commanderProgram.dir;

const port = Number(commanderProgram.port);

console.log(`Starting the server...`);

const expressApp = require(`express`)();

expressApp.get(`/`, (request, response) => {

    response.send(`QueueShare!`);

});

expressApp.get(`/syncedState/ChangesSince/:version`, (request, response) => {

    const version = Number(request.params.version);

    response.send(`changes since version ${version}!`);

});

expressApp.listen(port, () => {

    console.log(`QueueShare is now available at http://localhost:${port}`);

});