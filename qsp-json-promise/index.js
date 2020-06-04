"use strict";

const fs = require(`fs`);
const stringFileEncoding = require(`../string-file-encoding`);

const file = require(`../qsp-file`);

const JsonPromise = async () => {

    return JSON.parse(

        await fs.promises.readFile(file, {encoding: stringFileEncoding})

        );

};

module.exports = JsonPromise;
