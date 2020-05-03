#!/usr/bin/env node

"use strict";

const {dir} = require(`./command.js`);
const fs = require(`fs`);
const log = require(`log`);
const nodemon = require(`nodemon`);
const onExit = require(`exit-hook`);
const Path = require(`path`);

console.log();

fs.mkdirSync(dir, {recursive: true});

const lockFile = Path.join(dir, `lock`);

if (fs.existsSync(lockFile)) {

    log(
        `It looks like there's already a QueueShare process serving "${dir}".`
        + ` Multiple processes serving the same data can cause errors and data`
        + ` corruption, so this process will be terminated. If you're certain` 
        + ` that there are no other processes serving this data, delete`
        + ` "${lockFile}" and try again.`
        );

}
else {

    fs.writeFileSync(lockFile, ``);

    onExit(() => {

        fs.unlinkSync(lockFile);

        console.log();

    });

    nodemon({

        script: `server.js`,

        args: process.argv.slice(2),

        verbose: false,

        });

    nodemon.on(`exit`, () => process.exit());

    nodemon.on(`crash`, () => process.exit(1));

}
