"use strict";

const FileContents = require(`../file-contents`);
const fs = require(`fs`);
const JsonOrUndefined = require(`../json-or-undefined`);
const JsonString = require(`../json-string`);
const stringFileEncoding = require(`../string-file-encoding`);

const FsJson = class {

    constructor (fsPath) {

        this._file = fsPath;

    }

    Value () {

        return JsonOrUndefined(FileContents(

            this._file, 
 
            {encoding: stringFileEncoding},

            ));

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
