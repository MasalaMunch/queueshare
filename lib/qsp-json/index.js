"use strict";

const fs = require(`fs`);
const stringEncoding = require(`../string-encoding`);

const file = require(`../qsp-file`);

const Json = () => {

    return JSON.parse(fs.readFileSync(file, {encoding: stringEncoding}));

};

module.exports = Json;
