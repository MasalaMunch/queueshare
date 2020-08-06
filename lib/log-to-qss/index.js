"use strict";

const assert = require(`assert`);

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

log.hasStarted = false;

log.start = () => {

    assert(!log.hasStarted);

    console.log();

    log.hasStarted = true;

};

module.exports = log;
