"use strict";

const FileContents = require(`../file-contents`);
const fs = require(`fs`);
const JsonString = require(`../json-string`);
const stringFileEncoding = require(`../string-file-encoding`);

const StoredJson = class {

    constructor (path) {

        this._file = path;

    }

    Value () {

        const fileContents = FileContents(

            this._file, 

            {encoding: stringFileEncoding},

            );

        return (

            fileContents === undefined? 

            undefined : JSON.parse(fileContents)

            );

    }

    write (value) {

        fs.writeFileSync(

            this._file, 

            JsonString(value),

            {encoding: stringFileEncoding},

            );

    }

    };

module.exports = StoredJson;
