"use strict";

const os = require(`os`);
const path = require(`path`);

module.exports = {

    dir: path.join(os.homedir(), `queueshareData`),

    port: 42069,

    };
