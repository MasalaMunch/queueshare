#!/usr/bin/env node

"use strict";

const defaultConfig = require(`./defaultConfig.js`);
const {program} = require(`commander`);
const {version} = require(`./package.json`);

program.option(
    `-d|--dir <dir>`, 
    `where the queue will be stored`, 
    defaultConfig.dir,
    );

program.option(
    `-npm|--npm-command <command>`, 
    "`${command} update` will be run to update QueueShare", 
    defaultConfig.npmCommand,
    );

program.option(
    `-p|--port <port>`, 
    `where the queue will be served`, 
    String(defaultConfig.port),
    );

program.version(
    version, 
    `-v|--version`
    );

program.parse(process.argv);

require(`.`)({

    dir: program.dir,

    npmCommand: program.npmCommand,

    port: Number(program.port),

    });
