"use strict";

const os = require(`os`);
const Path = require(`Path`);

module.exports = {

    dir: Path.join(os.homedir(), `queueshareData`),

    port: 42069,

    shouldOpen: true,


    };
