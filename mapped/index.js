"use strict";

const OwnProps = require(`../own-props`);

const Mapped = (target, callback) => {

    const mapped = {};

    for (const prop of OwnProps(target)) {

        mapped[prop] = callback(target[prop], prop, target);

    }

    return mapped;

};

module.exports = Mapped;
