#!/usr/bin/env node

"use strict";

console.log();

const commanderProgram = require(`commander`).program;

commanderProgram.version(require(`./package.json`).version);

commanderProgram.option(`-D|--dir <directory>`);

commanderProgram.option(`-P|--port <port>`);

// commanderProgram.option(`-DM|--dev-mode`);

commanderProgram.parse(process.argv);

const directory = (
    (commanderProgram.dir === undefined)? 
    `~/queueshare` : commanderProgram.dir
    );

const port = (
    (commanderProgram.port === undefined)? 
    42069 : Number(commanderProgram.port)
    );

// const isInDevMode = (
//     (commanderProgram.devMode === undefined)? 
//     false : commanderProgram.devMode
//     );

const expressApp = require(`express`)();

expressApp.get(`/`, (request, response) => {
    response.send(`QueueShare!`);
});

console.log(`Starting the server...`);

expressApp.listen(port, () => {

    const url = `http://localhost:${port}`;

    console.log(`Done! QueueShare is now available at ${url}`);

    console.log();

});