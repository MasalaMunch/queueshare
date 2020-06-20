"use strict";

const assert = require(`assert`);

const RandomInt = (min, max) => {

    assert(Number.isInteger(min));

    assert(Number.isInteger(max));

    return min + Math.floor(Math.random() * (max - min + 1));

};

module.exports = RandomInt;
