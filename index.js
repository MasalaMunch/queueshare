#!/usr/bin/env node

"use strict";

const {program} = require(`commander`);

const package = require(`./package.json`);

program.version(package.version);

program.option(
    `-D|--dir <directory>`, 
    `where the queue will be stored`,
    `~/QueueShare`,
    );

program.option(
    `-P|--port <port>`, 
    `where the queue will be served`,
    String(42069),
    );

program.parse(process.argv);

const directory = program.dir;

const port = Number(program.port);

console.log({directory, port});