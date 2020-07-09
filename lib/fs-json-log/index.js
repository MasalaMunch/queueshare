"use strict";

const FileContents = require(`../file-contents`);
const fs = require(`fs`);
const JsonOrUndefined = require(`../json-or-undefined`);
const JsonString = require(`../json-string`);
const stringEncoding = require(`../string-encoding`);

const jsonStringSeparator = `\n`;

const FsJsonLog = class {

    constructor (fsPath) {

        this._file = fsPath;

        this._fileAppendStream = undefined;

    }

    Entries () {

        const fileContents = FileContents(

            this._file, 

            {encoding: stringEncoding},

            );

        return (

            (fileContents === undefined? `` : fileContents)

            .split(jsonStringSeparator)

            .map(JsonOrUndefined)

            .filter((jsonOrUndefined) => jsonOrUndefined !== undefined)

            );

    }

    eventuallyAppend (entry) {

        if (this._fileAppendStream === undefined) {

            this._fileAppendStream = fs.createWriteStream(

                this._file, 

                {encoding: stringEncoding, flags: `a`},

                );

        }

        this._fileAppendStream.write(JsonString(entry) + jsonStringSeparator);

    }

    write (entries) {

        fs.writeFileSync(

            this._file, 

            entries.map(JsonString).concat([``]).join(jsonStringSeparator),

            {encoding: stringEncoding},

            );

    }

    };

module.exports = FsJsonLog;
