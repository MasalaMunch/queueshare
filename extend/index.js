"use strict";

const assert = require(`assert`);
const OwnProps = require(`../own-props`);

const extend = (target, source) => {

    for (const prop of OwnProps(source)) {

        assert(!(prop in target));

        target[prop] = source[prop];

    }

};

module.exports = extend;
