"use strict";

const Mapped = (something, callback) => {

    const mapped = {};

    for (const prop in something) {

        if (something.hasOwnProperty(prop)) {

            mapped[prop] = callback(something[prop], prop, something);

        }

    }

    return mapped;

};

module.exports = Mapped;
