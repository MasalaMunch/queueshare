"use strict";

const assert = require(`assert`);
const {List} = require(`immutable`);

let queue = List();

const start = () => setTimeout(() => {

    const {f, resolve, reject} = queue.first();

    queue = queue.shift();

    if (!queue.isEmpty()) {

        start();

    }

    let output, handleOutput;

    try {

        output = f();
        handleOutput = resolve;

    } catch (error) {

        output = error;
        handleOutput = reject;

    }

    handleOutput(output);

}, 0);

const eventually = (f) => new Promise((resolve, reject) => {

    assert(typeof f === `function`);

    const isFirstInQueue = queue.isEmpty();

    queue = queue.push({f, resolve, reject});

    if (isFirstInQueue) {

        start();

    }

});

module.exports = eventually;
