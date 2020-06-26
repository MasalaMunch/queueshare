"use strict";

const Mapped = require(`../mapped`);
const path = require(`path`);

const lsFolder = `qsc`;

const lsFolderPaths = {theme: `theme`};

const lsPaths = Mapped(lsFolderPaths, (p) => path.join(lsFolder, p));

module.exports = lsPaths;
