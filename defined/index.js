"use strict";

const define = require(`../define`);

const Defined = (target, source) => {

    const defined = {...target};

    define(defined, source);

    return defined;

};

module.exports = Defined;
