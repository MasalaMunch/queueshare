"use strict";

const chokidar = require(`chokidar`);

const folder = require(`../qsp-folder`);

const watcher = chokidar.watch(folder, {

    ignored: [

        /(^|[\/\\])\../, 

        /(^|[\/\\])node_modules/,

        ],

    ignoreInitial: true,

    });

module.exports = watcher;
