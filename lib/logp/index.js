"use strict";

const assert = require(`assert`);

const logp = (...things) => {

    console.log(...things);

    const lastThing = things[things.length-1];

    const hasTrailingNewline = (

        typeof lastThing === `string` && lastThing[lastThing.length-1] === `\n`

        );

    if (!hasTrailingNewline) {

        console.log();

    }

};

logp.hasStarted = false;

logp.start = () => {

    assert(!logp.hasStarted);

    console.log();

    logp.hasStarted = true;

};

module.exports = logp;
