"use strict";

const OwnProps = require(`../own-props`);

const Filtered = (target, callback) => {

    const filtered = {};

    for (const prop of OwnProps(target)) {

        if (callback(target[prop], prop, target)) {

            filtered[prop] = target[prop];

        }

    }

    return filtered;

};

module.exports = Filtered;
