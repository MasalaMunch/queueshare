"use strict";

const Defaultified = (something, defaultThing) => {

    const defaultified = {...something};

    for (const prop in defaultThing) {

        if (defaultThing.hasOwnProperty(prop)) {

            if (defaultified[prop] === undefined) {

                defaultified[prop] = defaultThing[prop];

            }

        }

    }

    return defaultified;

};

module.exports = Defaultified;
