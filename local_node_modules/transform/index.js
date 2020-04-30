"use strict";

module.exports = (something, callback) => {

    for (const key in something) {

        if (something.hasOwnProperty(key)) {

            something[key] = callback(something[key], key, something);

        }

    }

    return something;

};