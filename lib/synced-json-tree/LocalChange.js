"use strict";

const assert = require(`assert`);

const LocalChange = {

    Valid (localChange) {

        let {path, value} = localChange;

        assert(Array.isArray(path));

        for (const child of path) {

            assert(typeof child === `string`);

        }

        if (value !== undefined) {

            value = JSON.parse(JSON.stringify(value));

        }

        return {path, value};

    },

    };

module.exports = LocalChange;
