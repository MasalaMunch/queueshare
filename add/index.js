"use strict";

const assert = require(`assert`);

module.exports = (target, ...sources) => {

    for (const s of sources) {

        for (const key in s) {

            if (s.hasOwnProperty(key)) {

                assert(!(key in target));

                target[key] = s[key];                

            }


        }

    }

    return target;

};