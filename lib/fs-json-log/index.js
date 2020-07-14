"use strict";

const FileContents = require(`../file-contents`);
const fs = require(`fs`);
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

        const fileAsString = (fileContents === undefined? `` : fileContents);

        const entries = [];

        for (const jsonString of fileAsString.split(jsonStringSeparator)) {

            let entry;

            try {

                entry = JSON.parse(jsonString);

            } catch (error) {

                continue;

            }

            entries.push(entry);

        }

        return entries;

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
