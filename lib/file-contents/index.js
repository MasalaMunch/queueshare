"use strict";

const fs = require(`fs`);

const FileContents = (file, options) => {

    let fileContents;

    try {

        fileContents = fs.readFileSync(file, options);

    } catch (error) {

        if (error.code !== `ENOENT`) {

            throw error;

        }

    }

    return fileContents;

};

FileContents.IsSupported = () => typeof fs.readFileSync === `function`;

module.exports = FileContents;
