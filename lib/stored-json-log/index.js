"use strict";

const FileContents = require(`../file-contents`);
const fs = require(`fs`);
const JsonString = require(`../json-string`);
const stringFileEncoding = require(`../string-file-encoding`);

const jsonStringSeparator = `\n`;

const StoredJsonLog = class {

    constructor (storagePath) {

        this._file = storagePath;

        this._fileAppendStream = undefined;

    }

    Entries () {

        const fileContents = FileContents(

            this._file, 

            {encoding: stringFileEncoding},

            );

        const fileAsString = fileContents === undefined? `` : fileContents;

        return fileAsString.split(jsonStringSeparator).slice(0, -1).map((s) => {

            try {

                return JSON.parse(s);

            } catch (error) {

                return error;

            }

        });

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

module.exports = StoredJsonLog;
