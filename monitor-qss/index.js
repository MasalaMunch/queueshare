"use strict";

const chokidar = require(`chokidar`);

const packagePath = require(`../qss-package-path`);
const restartQss = require(`../restart-qss`);

const monitorQss = () => {

    const watcher = chokidar.watch(packagePath, {

        ignored: [

            /(^|[\/\\])\../, 

            /(^|[\/\\])node_modules/,

            ],

        ignoreInitial: true,

    });

    watcher.on(`all`, () => restartQss(`A change was detected.`));

};

module.exports = monitorQss;
