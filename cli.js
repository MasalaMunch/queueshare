#!/usr/bin/env node

"use strict";

const {program} = require(`commander`);

const defaultConfig = require(`default-queueshare-config`);
const queueshare = require(`.`);
const {version} = require(`./package.json`);

program.option(
    `-d|--dir <dir>`, 
    `where the queue will be stored`, 
    defaultConfig.dir,
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

queueshare({

    dir: program.dir,

    port: Number(program.port),

    });
