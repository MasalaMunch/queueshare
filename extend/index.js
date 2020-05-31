"use strict";

const assert = require(`assert`);

const extend = (target, source) => {

    for (const prop in source) {

        if (source.hasOwnProperty(prop)) {

            assert(!(prop in target));

            target[prop] = source[prop];

        }

    }

};

module.exports = extend;
