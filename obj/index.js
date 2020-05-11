"use strict";

const assert = require(`assert`);
const deepFreeze = require(`deep-freeze`);

module.exports = (something) => {

    const obj = {};

    Object.assign(obj, something);

    return obj;

};

Object.assign(module.exports, {

    add: (target, ...sources) => {

        for (const s of sources) {

            for (const key in s) {

                if (s.hasOwnProperty(key)) {

                    assert(!(key in target));

                    target[key] = s[key];                

                }


            }

        }

        return target;

    },

    deeplyFreeze: (something) => {

        if (something !== undefined && something !== null) {

            deepFreeze(something);

        }

        return something;
    },

    define: (target, ...sources) => {

        for (const s of sources) {

            for (const key in s) {

                if (s.hasOwnProperty(key)) {

                    if (target[key] === undefined) {

                        target[key] = s[key];                    

                    }

                }


            }

        }

        return target;

    },

    transform: (something, callback) => {

        for (const key in something) {

            if (something.hasOwnProperty(key)) {

                something[key] = callback(something[key], key, something);

            }

        }

        return something;

    },

    });
