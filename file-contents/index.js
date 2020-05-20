"use strict";

const fs = require(`fs`);

const FileContents = (path, options) => {

    let contents;

    try {

        contents = fs.readFileSync(path, options);

    } catch (error) {

        if (error.code !== `ENOENT`) {

            throw error;

        }

    }

    return contents;

};

module.exports = FileContents;
