"use strict";

const FileContents = require(`../file-contents`);
const fs = require(`fs`);
const JsonOrUndefined = require(`../json-or-undefined`);
const JsonString = require(`../json-string`);
const stringEncoding = require(`../string-encoding`);

const FsJson = class {

    constructor (fsPath) {

        this._file = fsPath;

    }

    Value () {

        return JsonOrUndefined(FileContents(

            this._file, 
 
            {encoding: stringEncoding},

            ));

    }

    write (value) {

        fs.writeFileSync(

            this._file, 

            JsonString(value),

            {encoding: stringEncoding},

            );

    }

    };

module.exports = FsJson;
