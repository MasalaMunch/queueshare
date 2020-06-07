"use strict";

const OwnProps = require(`../own-props`);

const transform = (target, callback) => {

    for (const prop of OwnProps(target)) {

        target[prop] = callback(target[prop], prop, target);

    }

};

module.exports = transform;
