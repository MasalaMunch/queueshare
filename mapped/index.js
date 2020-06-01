"use strict";

const Mapped = (target, callback) => {

    const mapped = {};

    for (const prop in target) {

        if (target.hasOwnProperty(prop)) {

            mapped[prop] = callback(target[prop], prop, target);

        }

    }

    return mapped;

};

module.exports = Mapped;
