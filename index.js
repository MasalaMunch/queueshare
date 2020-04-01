#!/usr/bin/env node

"use strict";

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

console.log(`Starting the server...`);

const expressApp = require(`express`)();

expressApp.get(`/`, (request, response) => {
    response.send(`QueueShare!`);
});

expressApp.listen(port, () => {

    console.log(`QueueShare is now available at http://localhost:${port}`);

});