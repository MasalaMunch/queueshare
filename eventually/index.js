"use strict";

const assert = require(`assert`);
const Queue = require(`../queue`);

const queue = new Queue();

const start = () => setTimeout(() => {

    const {func, resolve, reject} = queue.OldestItem();

    queue.deleteOldestItem();

    if (!queue.IsEmpty()) {

        start();

    }

    let output, handleOutput;

    try {

        output = func();
        handleOutput = resolve;

    } catch (error) {

        output = error;
        handleOutput = reject;

    }

    handleOutput(output);

}, 0);

module.exports = (func) => new Promise((resolve, reject) => {

    assert(typeof func === `function`);

    const isFirstFunc = queue.IsEmpty();

    queue.add({func, resolve, reject});

    if (isFirstFunc) {

        start();

    }

});