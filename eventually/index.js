"use strict";

const assert = require(`assert`);
const Queue = require(`../queue`);

const queue = new Queue();

const start = () => setTimeout(() => {

    const {f, resolve, reject} = queue.OldestItem();

    queue.deleteOldestItem();

    if (!queue.IsEmpty()) {

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

module.exports = (f) => new Promise((resolve, reject) => {

    assert(typeof f === `function`);

    const isFirstFunc = queue.IsEmpty();

    queue.add({f, resolve, reject});

    if (isFirstFunc) {

        start();

    }

});
