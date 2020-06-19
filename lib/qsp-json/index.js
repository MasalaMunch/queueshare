"use strict";

const fs = require(`fs`);
const stringFileEncoding = require(`../string-file-encoding`);

const file = require(`../qsp-file`);

const Json = () => {

    return JSON.parse(fs.readFileSync(file, {encoding: stringFileEncoding}));

};

module.exports = Json;
