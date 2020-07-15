"use strict";

const assert = require(`assert`);

const Theme = {

    all: new Set([`dark`, `light`, `system`]),

    default: `system`,

    Valid: (theme) => {

        assert(Theme.all.has(theme));

        return theme;

    },

    };

module.exports = Theme;
