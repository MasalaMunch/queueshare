#!/usr/bin/env node

"use strict";

const os = require(`os`);
const path = require(`path`);
const {program} = require(`commander`);

const queueshare = require(`.`);
const {version} = require(`./package.json`);

program.option(
    `-d|--dir <dir>`, 
    `store queue data in <dir>`, 
    path.join(os.homedir(), `queueshareData`),
    );

program.version(
    version, 
    `-v|--version`,
    );

program.parse(process.argv);

queueshare({

    dir: program.dir,

    });
