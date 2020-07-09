"use strict";

const os = require(`os`);
const path = require(`path`);

const defaultConfig = {

    folder: path.join(os.homedir(), `QueueShare Data`),

    isDev: false,

    shouldUpdate: true,

    };

module.exports = defaultConfig;
