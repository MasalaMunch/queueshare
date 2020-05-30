"use strict";

const path = require(`path`);

const File = (isDev) => path.join(__dirname, `client.html`);

//TODO if isDev, compile the file from source modules

module.exports = File;
