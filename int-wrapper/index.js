"use strict";

const assert = require(`assert`);
    
module.exports = (min, max) => {

    assert(Number.isInteger(min));

    assert(Number.isInteger(max));

    assert(min <= max);

    return (int) => {

        assert(Number.isInteger(int));

        return min + Math.abs(int % (min - max - 1));

    };

};
