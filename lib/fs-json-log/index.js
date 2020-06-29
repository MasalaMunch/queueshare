"use strict";

const FileContents = require(`../file-contents`);
const fs = require(`fs`);
const JsonString = require(`../json-string`);
const stringFileEncoding = require(`../string-file-encoding`);

const jsonStringSeparator = `\n`;

const FsJsonLog = class {

    constructor (fsPath) {

        this._file = fsPath;

        this._fileAppendStream = undefined;

    }

    Entries () {

        const fileContents = FileContents(

            this._file, 

            {encoding: stringFileEncoding},

            );

        const fileAsString = fileContents === undefined? `` : fileContents;

        const jsonStrings = fileAsString.split(jsonStringSeparator);

        jsonStrings.pop(); // the last element should be the empty string

        const entries = [];

        for (const string of jsonStrings) {

            let json;

            try {

                json = JSON.parse(string);

            } catch (error) {

                continue;

            }

            entries.push(json);

        }

        return entries;

    }

    eventuallyAppend (entry) {

        if (this._fileAppendStream === undefined) {

            this._fileAppendStream = fs.createWriteStream(

                this._file, 

                {encoding: stringFileEncoding, flags: `a`},

                );

        }

        this._fileAppendStream.write(JsonString(entry) + jsonStringSeparator);

    }

    write (entries) {

        fs.writeFileSync(

            this._file, 

            entries.map(JsonString).concat([``]).join(jsonStringSeparator),

            {encoding: stringFileEncoding},

            );

    }

    };

module.exports = FsJsonLog;
