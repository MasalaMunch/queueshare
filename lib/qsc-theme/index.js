"use strict";

const assert = require(`assert`);

const validThemes = new Set([`dark`, `light`]);

const Theme = {

    default: `dark`,

    Valid: (theme) => {

        assert(validThemes.has(theme));

        return theme;

    },

    };

module.exports = Theme;
