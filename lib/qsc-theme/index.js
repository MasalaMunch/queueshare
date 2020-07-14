"use strict";

const assert = require(`assert`);

const Theme = {

    all: new Set([`dark`, `light`]),

    default: `dark`,

    Valid: (theme) => {

        assert(Theme.all.has(theme));

        return theme;

    },

    };

module.exports = Theme;
