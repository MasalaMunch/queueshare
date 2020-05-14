#!/usr/bin/env node

"use strict";

const os = require(`os`);
const path = require(`path`);
const {program} = require(`commander`);

const queueshare = require(`.`);
const {version} = require(`./package.json`);

program.option(
    `-f|--folder <folder>`, 
    `store queue data in <folder>`, 
    path.join(os.homedir(), `queueshareData`),
    );

program.version(
    version, 
    `-v|--version`,
    );

program.parse(process.argv);

queueshare({

    folder: program.folder,

    });
