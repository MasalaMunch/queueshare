#!/usr/bin/env node

const {program} = require(`commander`);

const package = require(`./package.json`);

program.version(package.version);

program.option(
    `-D|--dir <directory>`, 
    `where data will be stored`,
    `~/QueueShare`,
    );

program.parse(process.argv);

const directory = program.dir;

console.log({directory});