"use strict";

const assert = require(`assert`);

const LocalChange = {

    Valid: (localChange) => {

        const {path, value} = localChange;

        assert(Array.isArray(path));

        for (const child of path) {

            assert(typeof child === `string`);

        }

        return {

            path,

            value: (
                value === undefined? value : JSON.parse(JSON.stringify(value))
                ),

            };

    },

    };

module.exports = LocalChange;
