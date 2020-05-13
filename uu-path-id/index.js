"use strict";

const fs = require(`fs`);
const uuid = require(`uuid`);

const fileEncoding = `utf8`;

module.exports = (path) => {

    let uuPathId;

    try {

        uuPathId = fs.readFileSync(path, {encoding: fileEncoding});

    }
    catch (error) {

        if (error.code === `ENOENT`) {

            uuPathId = uuid.v4();

            fs.writeFileSync(path, uuPathId, {encoding: fileEncoding});

        }
        else {

            throw error;

        }

    }

    return uuPathId;

};
