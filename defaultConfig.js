"use strict";

const os = require(`os`);
const Path = require(`path`);

module.exports = {

    dir: Path.join(os.homedir(), `queueshareData`),

    npmCommand: `npm`,

    port: 42069,

    };
