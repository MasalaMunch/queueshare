"use strict";

const FileContents = require(`../file-contents`);
const fs = require(`fs`);
const uuid = require(`uuid`);

const fileOptions = {encoding: `utf8`};

const UuPathId = (path) => {

    let uuPathId = FileContents(path, fileOptions);

    if (uuPathId === undefined) {

        uuPathId = uuid.v4();

        fs.writeFileSync(path, uuPathId, fileOptions);

    }

    return uuPathId;

};

module.exports = UuPathId;
