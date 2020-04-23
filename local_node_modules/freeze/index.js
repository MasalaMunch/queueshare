"use strict";

const deepFreeze = require(`deep-freeze`);

module.exports = (something) => {

    if (something !== undefined && something !== null) {

        deepFreeze(something);

    }

    return something;

};