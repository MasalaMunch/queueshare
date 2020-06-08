"use strict";

const path = require(`path`);
const Transformed = require(`../transformed`);

const storageFolder = `qsc`;

const storageFolderPaths = {

    serverPid: `serverPid`,

    };

const storagePaths = Transformed(

    storageFolderPaths, 

    (p) => path.join(storageFolder, p),

    );

module.exports = storagePaths;
