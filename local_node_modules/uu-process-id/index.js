"use strict";

const uuid = require(`uuid`);

let uuProcessId;

module.exports = () => {

    if (uuProcessId === undefined) {

        uuProcessId = uuid.v4();

    }

    return uuProcessId;

};
