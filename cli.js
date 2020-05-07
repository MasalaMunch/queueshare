#!/usr/bin/env node

"use strict";

const defaultConfig = require(`./defaultConfig.js`);
const {program} = require(`commander`);
const {version} = require(`./package.json`);

program.version(
    version, 
    `-v|--version`
    );

program.option(
    `-d|--dir <dir>`, 
    `where the queue will be stored`, 
    defaultConfig.dir,
    );

program.option(
    `-no|--no-open`,
    `don't open QueueShare after setting it up`,
    );

program.option(
    `-p|--port <port>`, 
    `where the queue will be served`, 
    String(defaultConfig.port),
    );

program.parse(process.argv);

require(`.`)({

    dir: program.dir,

    port: Number(program.port),

    shouldOpen: program.open,

    });
