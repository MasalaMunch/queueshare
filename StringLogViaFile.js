"use strict";

const assert = require(`assert`);
const fs = require(`fs`);

const encoding = `utf8`;

module.exports = class {

    constructor ({path, separator}) {

        this._path = path;

        this._appendStream = 
            fs.createWriteStream(this._path, {encoding, flags: `a`});

        assert(typeof separator === `string`);
        this._separator = separator;

    }

    Entries () {

        let fileAsString;

        try {

            fileAsString = fs.readFileSync(this._path, {encoding});

        } 
        catch (error) {

            if (error.code === `ENOENT`) {
                fileAsString = ``;
            }
            else {
                throw error;
            }

        }

        const entries = fileAsString.split(this._separator);

        entries.pop();

        return entries;

    }

    clear () {

        fs.writeFileSync(this._path, ``, {encoding});

    }

    addToWriteQueue (entry) {

        assert(typeof entry === `string`);

        this._appendStream.write(entry + this._separator);

    }

    };