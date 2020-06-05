"use strict";

const FileContents = require(`../file-contents`);
const fs = require(`fs`);
const JsonString = require(`../json-string`);
const stringFileEncoding = require(`../string-file-encoding`);

const ViaFs = class {

    constructor (storagePath) {

        this._file = storagePath;

    }

    Value () {

        const fileContents = FileContents(

            this._file, 

            {encoding: stringFileEncoding},

            );

        return fileContents === undefined? undefined : JSON.parse(fileContents);

    }

    write (value) {

        fs.writeFileSync(

            this._file, 

            JsonString(value),

            {encoding: stringFileEncoding},

            );

    }

    };

ViaFs.IsSupported = () => {

    return FileContents.IsSupported() && typeof fs.writeFileSync === `function`;

};

module.exports = ViaFs;
