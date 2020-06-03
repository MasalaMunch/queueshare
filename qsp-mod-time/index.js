"use strict";

const fs = require(`fs`);
const path = require(`path`);

const folder = require(`../qsp-folder`);

const file = path.join(folder, `package.json`);

const ModTime = async () => (await fs.promises.stat(file)).mtimeMs;

module.exports = ModTime;
