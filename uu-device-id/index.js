"use strict";

const fs = require(`fs`);
const uuid = require(`uuid`);

const fileEncoding = `utf8`;

module.exports = (path) => {

    let uuDeviceId;

    try {

        uuDeviceId = fs.readFileSync(path, {encoding: fileEncoding});

    }
    catch (error) {

        if (error.code === `ENOENT`) {

            uuDeviceId = uuid.v4();

            fs.writeFileSync(path, uuDeviceId, {encoding: fileEncoding});

        }
        else {

            throw error;

        }

    }

    return uuDeviceId;

};
