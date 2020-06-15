"use strict";

const Value = {

    IsPrimitive: (value) => {

        return typeof value !== `object` || Array.isArray(value);

    },

    };

module.exports = Value;
