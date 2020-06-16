#!/usr/bin/env node

"use strict";

const {program} = require(`commander`);

const defaultConfig = require(`./lib/default-qss-config`);
const log = require(`./lib/log-to-qss`);
const packageFile = require(`./lib/qsp-file`);
const start = require(`./lib/start-qss`);

program.option(
    `-f, --folder <folder>`, 
    `store data in <folder>`, 
    defaultConfig.folder,
    );

if (defaultConfig.shouldUpdate) {

    program.option(`-nu, --no-update`, `disable auto-update`);

}
else {

    program.option(`-u, --update`, `enable auto-update`);

}


if (defaultConfig.isDev) {

    program.option(`-nd, --no-dev`, `disable developer mode`);

}
else {

    program.option(`-d, --dev`, `enable developer mode`);

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

    shouldUpdate: program.update,

    });
