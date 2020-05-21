"use strict";

const CallbackArgs = (f) => {

    let args;

    try {

        args = [null, f()];

    } catch (error) {

        args = [error];

    }

    return args;

};

module.exports = CallbackArgs;
