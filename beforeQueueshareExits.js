"use strict";

const assert = require(`assert`);

const functions = [];

let functionsHaveBeenCalled = false;

const callFunctionsIfTheyHaventBeenCalled = () => {

    if (!functionsHaveBeenCalled) {

        functionsHaveBeenCalled = true;

        functions.forEach((f) => f());

    }

};

process.once(`exit`, callFunctionsIfTheyHaventBeenCalled);

process.once(`SIGINT`, () => {

    callFunctionsIfTheyHaventBeenCalled();

    process.kill(process.pid, `SIGINT`);

});

process.once(`SIGTERM`, () => {

    callFunctionsIfTheyHaventBeenCalled();

    process.kill(process.pid, `SIGTERM`);

});

module.exports = (f) => {

    assert(typeof f === `function`);

    functions.push(f);

};
