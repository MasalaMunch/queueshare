"use strict";

const assert = require(`assert`);

const JsonString = (json) => {

    const jsonString = JSON.stringify(json);

    assert(typeof jsonString === `string`);

    return jsonString;

};

module.exports = JsonString;
