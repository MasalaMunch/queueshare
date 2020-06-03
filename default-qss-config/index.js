"use strict";

const os = require(`os`);
const path = require(`path`);

const defaultConfig = {

    folder: path.join(os.homedir(), `QueueShare`),

    isDev: false,

    };

module.exports = defaultConfig;
