"use strict";

const extend = require(`../extend`);

const Extended = (target, source) => {

    const extended = {...target};

    extend(extended, source);

    return extended;

};

module.exports = Extended;
