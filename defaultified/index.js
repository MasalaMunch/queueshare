"use strict";

const Defaultified = (target, source) => {

    const defaultified = {...target};

    for (const prop in source) {

        if (source.hasOwnProperty(prop)) {

            if (defaultified[prop] === undefined) {

                defaultified[prop] = source[prop];

            }

        }

    }

    return defaultified;

};

module.exports = Defaultified;
