"use strict";

const CallbackArgs = (f) => {

    let args;

    try {

        args = [null, f()];

    } catch (error) {

        console.error(`error`, error);

        args = [error];

    }

    return args;

};

module.exports = CallbackArgs;
