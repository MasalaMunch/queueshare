"use strict";

const transform = require(`../transform`);

const Transformed = (target, callback) => {

    const transformed = {...target};

    transform(transformed, callback);

    return transformed;

};

module.exports = Transformed;
