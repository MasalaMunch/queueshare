"use strict";

const chokidar = require(`chokidar`);

const packageFolder = require(`../qsp-folder`);

const PackageWatcher = () => {

    return chokidar.watch(packageFolder, {

        ignored: [

            /(^|[\/\\])\../, 

            /(^|[\/\\])node_modules/,

            ],

        ignoreInitial: true,

        });

};

module.exports = PackageWatcher;
