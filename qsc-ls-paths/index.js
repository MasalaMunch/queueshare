"use strict";

const Mapped = require(`../mapped`);
const path = require(`path`);

const folder = `qsc`;

const folderPaths = {

    };

const lsPaths = Mapped(folderPaths, (p) => path.join(folder, p));

module.exports = lsPaths;
