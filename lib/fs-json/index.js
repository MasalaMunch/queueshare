"use strict";

const FileContents = require(`../file-contents`);
const fs = require(`fs`);
const JsonString = require(`../json-string`);
const stringEncoding = require(`../string-encoding`);

const FsJson = class {

    constructor (fsPath, ValidValue, defaultValue) {

        this._defaultValue = defaultValue;

        this._file = fsPath;

        this._ValidValue = ValidValue;

    }

    Value () {

        let value;

        const fileContents = FileContents(

            this._file, 
 
            {encoding: stringEncoding},

            );

        try {

            value = this._ValidValue(JSON.parse(fileContents));

        } catch (error) {

            value = this._defaultValue;

        }

        return value;

    }

    write (value) {

        fs.writeFileSync(

            this._file, 

            JsonString(this._ValidValue(value)),

            {encoding: stringEncoding},

            );

    }

    };

module.exports = FsJson;
