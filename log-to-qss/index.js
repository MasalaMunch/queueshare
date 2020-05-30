"use strict";

const log = (...things) => {

    console.log(...things);

    const lastThing = things[things.length-1];

    const hasTrailingNewline = (

        typeof lastThing === `string` && lastThing[lastThing.length-1] === `\n`

        );

    if (!hasTrailingNewline) {

        console.log();

    }

};

log.start = () => {

    console.log();

};

module.exports = log;
