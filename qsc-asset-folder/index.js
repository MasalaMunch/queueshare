"use strict";

const path = require(`path`);

const AssetFolder = (isDev) => path.join(__dirname, `clientAssets`);

//TODO if isDev, compile the folder from source modules

module.exports = AssetFolder;
