#!/usr/bin/env node

"use strict";

const {program} = require(`commander`);

const defaultConfig = require(`./default-qss-config`);
const log = require(`./log-to-qss`);
const packageFile = require(`./qsp-file`);
const start = require(`.`);

program.option(
    `-f, --folder <folder>`, 
    `store data in <folder>`, 
    defaultConfig.folder,
    );

if (defaultConfig.isDev) {

    program.option(`-nd, --no-dev`, `don't run in developer mode`);

}
else {

    program.option(`-d, --dev`, `run in developer mode`);

}

program.option(`-v, --version`, `output the current version`);

program.option(`-h, --help`, `output help for command`);

program.on(`option:version`, () => {

    log.start();

    log(require(packageFile).version);

    process.exit();

});

program.on(`option:help`, () => {

    log.start();

    log(program.helpInformation());

    process.exit();

});

program.parse(process.argv);

start({

    folder: program.folder,

    isDev: program.dev,

    });
