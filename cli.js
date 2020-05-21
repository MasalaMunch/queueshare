#!/usr/bin/env node

"use strict";

const os = require(`os`);
const path = require(`path`);
const {program} = require(`commander`);

const log = require(`./log-to-qss`);
const queueshare = require(`.`);
const {version} = require(`./package.json`);

program.option(
    `-f, --folder <folder>`, 
    `store data in <folder>`, 
    path.join(os.homedir(), `QueueShare`),
    );

program.option(
    `-d, --dev`, 
    `run in developer mode`, 
    );

program.version(
    version,
    `-v, --version`,
    `output the current version`,
    );

program.option(
    `-h, --help`,
    `output help for command`,
    );

program.on(`option:help`, () => {

    console.log();

    console.log(program.helpInformation());

    process.exit();

});

program.parse(process.argv);

queueshare({

    folder: program.folder,

    isDev: program.dev,

    });
