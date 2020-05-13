"use strict";

const uuid = require(`uuid`);

let uuProcessId;

const UuProcessId = () => {

    if (uuProcessId === undefined) {

        uuProcessId = uuid.v4();

    }

    return uuProcessId;

};

module.exports = UuProcessId;
