"use strict";

const assert = require(`assert`);

const IntWrapper = (min, max) => {

    assert(Number.isInteger(min));

    assert(Number.isInteger(max));

    assert(min <= max);

    return (int) => {

        assert(Number.isInteger(int));

        return min + Math.abs(int % (min - max - 1));

    };

};

module.exports = IntWrapper;
