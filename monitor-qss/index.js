"use strict";

const chokidar = require(`chokidar`);

const packagePath = require(`../qss-package-path`);
const restart = require(`../restart-qss`);

const monitor = () => {

    const watcher = chokidar.watch(packagePath, {

        ignored: [

            /(^|[\/\\])\../, 

            /(^|[\/\\])node_modules/,

            ],

        ignoreInitial: true,

    });

    watcher.on(`all`, () => restart(`A change was detected.`));

};

module.exports = monitor;
