"use strict";

const FileContents = require(`../file-contents`);
const fs = require(`fs`);
const JsonString = require(`../json-string`);
const stringFileEncoding = require(`../string-file-encoding`);

const FsJson = class {

    constructor (fsPath) {

        this._file = fsPath;

    }

    Value () {

        const fileContents = FileContents(

            this._file, 
 
            {encoding: stringFileEncoding},

            );

        let value;

        if (fileContents !== undefined) {

            try {

                value = JSON.parse(fileContents);

            } catch (error) {

            }            

        }

        return value;

    }

    write (value) {

        fs.writeFileSync(

            this._file, 

            JsonString(value),

            {encoding: stringFileEncoding},

            );

    }

    };

module.exports = FsJson;
