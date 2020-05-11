"use strict";

module.exports = (something) => {

    const shallowCopy = {};

    Object.assign(shallowCopy, something);

    return shallowCopy;

};