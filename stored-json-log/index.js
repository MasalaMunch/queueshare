"use strict";

const assert = require(`assert`);
const FileContents = require(`../file-contents`);
const fs = require(`fs`);

const EntryAsString = (entry) => {

    const entryAsString = JSON.stringify(entry);

    assert(typeof entryAsString === `string`);

    return entryAsString;

};

const EntryFromString = JSON.parse;

const entryAsStringSeparator = `\n`;

const fileEncoding = `utf8`;

const StoredJsonLog = class {

    constructor (path) {

        this._filePath = path;

        this._fileAppendStream = fs.createWriteStream(

            this._filePath, 

            {encoding: fileEncoding, flags: `a`},

            );

    }

    Entries () {

        let fileAsString = FileContents(

            this._filePath, 

            {encoding: fileEncoding},

            );

        if (fileAsString === undefined) {

            fileAsString = ``;

        }

        const entriesAsStrings = fileAsString.split(entryAsStringSeparator);

        entriesAsStrings.pop();

        return entriesAsStrings.map(EntryFromString);

    }

    eventuallyAppend (entry) {

        this._fileAppendStream.write(EntryAsString(entry));

        this._fileAppendStream.write(entryAsStringSeparator);

    }

    write (entry) {

        fs.writeFileSync(

            this._filePath, 

            EntryAsString(entry) + entryAsStringSeparator,

            {encoding: fileEncoding},

            );

    }

    };

module.exports = StoredJsonLog;
