#!/usr/bin/env node

"use strict";

const commander = require(`commander`);

const defaultConfig = require(`./lib/default-qss-config`);
const log = require(`./lib/log-to-qss`);
const PackageJson = require(`./lib/qsp-json`);
const start = require(`./lib/start-qss`);

const {program} = commander;

program.storeOptionsAsProperties(true);

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

    program.option(`-nd, --no-dev`, `disable dev mode`);

}
else {

    program.option(`-d, --dev`, `enable dev mode`);

}

program.option(`-v, --version`, `output the current version`);

program.option(`-h, --help`, `output help for command`);

program.on(`option:version`, () => {

    log(PackageJson().version);

    process.exit();

});

program.on(`option:help`, () => {

    log(program.helpInformation());

    process.exit();

});

program.exitOverride((error) => {

    console.log();

    process.exit();

});

log.start();

program.parse(process.argv);    

start({

    folder: program.folder,

    isDev: program.dev,

    shouldUpdate: program.update,

    });
