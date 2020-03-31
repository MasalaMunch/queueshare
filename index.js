#!/usr/bin/env node

const {program} = require(`commander`);

const package = require('./package.json');

program.version(package.version);

program.option(
    `-p|--path <path>`, 
    `where data will be stored`,
    `~/QueueShare`,
    );

program.parse(process.argv);

const path = program.path;

console.log({path});