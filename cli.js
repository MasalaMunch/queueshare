#!/usr/bin/env node

"use strict";

const os = require(`os`);
const path = require(`path`);
const {program} = require(`commander`);

const queueshare = require(`.`);
const {version} = require(`./package.json`);

program.option(
    `-d|--dev`, 
    `run in developer mode`, 
    );

program.option(
    `-f|--folder <folder>`, 
    `store data in <folder>`, 
    path.join(os.homedir(), `QueueShare Data`),
    );

program.version(
    version, 
    `-v|--version`,
    );

program.parse(process.argv);

queueshare({

    folder: program.folder,

    isDev: program.dev,

    });
