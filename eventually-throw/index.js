"use strict";

const eventuallyThrow = (something) => {

    setTimeout(() => {

        throw something;

    }, 0);

};

module.exports = eventuallyThrow;
