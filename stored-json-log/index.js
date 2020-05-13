"use strict";

const assert = require(`assert`);
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

        this._file = path;

        this._fileAppendStream = fs.createWriteStream(

            this._file, 

            {encoding: fileEncoding, flags: `a`},

            );

    }

    Entries () {

        let fileAsString;

        try {

            fileAsString = fs.readFileSync(

                this._file, 

                {encoding: fileEncoding},

                );

        } 
        catch (error) {

            if (error.code === `ENOENT`) {

                fileAsString = ``;

            }
            else {

                throw error;
                
            }

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

            this._file, 

            EntryAsString(entry) + entryAsStringSeparator,

            {encoding: fileEncoding},

            );

    }

    };

module.exports = StoredJsonLog;
