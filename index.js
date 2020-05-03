#!/usr/bin/env node

"use strict";

const {dir, port} = require(`./command.js`);
const fs = require(`fs`);
const nodemon = require(`nodemon`);
const onExit = require(`exit-hook`);
const Path = require(`path`);

fs.mkdirSync(dir, {recursive: true});

const lockFile = Path.join(dir, `lock`);

if (fs.existsSync(lockFile)) {

    console.error(
        `It looks like there's already a QueueShare process serving "${dir}".`
        + ` Multiple processes serving the same data can cause errors and data`
        + ` corruption, so this process will be terminated. If you're certain` 
        + ` that there are no other processes serving this data, delete`
        + ` "${lockFile}" and try again.`
        );

}
else {

    fs.writeFileSync(lockFile, ``);

    onExit(() => fs.unlinkSync(lockFile));

    nodemon(`server.js -d ${dir} -p ${port}`);    

}
