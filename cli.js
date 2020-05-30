#!/usr/bin/env node

"use strict";

const {program} = require(`commander`);

const defaultConfig = require(`./default-qss-config`);
const log = require(`./log-to-qss`);
const queueshare = require(`.`);
const {version} = require(`./package.json`);

program.option(
    `-f, --folder <folder>`, 
    `store data in <folder>`, 
    defaultConfig.folder,
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

program.once(`option:help`, () => {

    console.log();

    console.log(program.helpInformation());

    process.exit();

});

program.parse(process.argv);

queueshare({

    folder: program.folder,

    isDev: program.dev,

    });
