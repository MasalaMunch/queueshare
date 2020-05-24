"use strict";

const chokidar = require(`chokidar`);

const packageFolder = require(`../qss-package-folder`);
const restart = require(`../restart-qss`);

const monitor = () => {

    const watcher = chokidar.watch(packageFolder, {

        ignored: [

            /(^|[\/\\])\../, 

            /(^|[\/\\])node_modules/,

            ],

        ignoreInitial: true,

    });

    watcher.on(`all`, () => restart(`A change was detected.`));

};

module.exports = monitor;
