#!/usr/bin/env node

"use strict";

const os = require(`os`);
const path = require(`path`);
const {program} = require(`commander`);

const queueshare = require(`.`);
const {version} = require(`./package.json`);

program.option(
    `-d|--dev`, 
    `run QueueShare in developer mode`, 
    );

program.option(
    `-f|--folder <folder>`, 
    `store queue data in <folder>`, 
    path.join(os.homedir(), `QueueShare Data`),
    );

program.option(
    `-nu|--no-update`, 
    `don't automatically update QueueShare`, 
    );

program.version(
    version, 
    `-v|--version`,
    );

program.parse(process.argv);

queueshare({

    folder: program.folder,

    isDev: program.dev,

    shouldUpdate: program.update,

    });
