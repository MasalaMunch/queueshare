"use strict";

const os = require(`os`);
const Path = require(`path`);

module.exports = {

    dir: Path.join(os.homedir(), `queueshareData`),

    port: 42069,

    };
