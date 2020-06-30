"use strict";

const assert = require(`assert`);
const EventEmitter = require(`events`);
const LsJson = require(`../ls-json`);

const defaultTheme = require(`../default-qsc-theme`);

const lsTheme = new LsJson(`theme`);

let theme;

const Theme = () => theme;

const availableThemes = [

    `light`, 

    `dark`, 

    `boosted-chews-light`,

    `boosted-chews-dark`, 

    `system`, 

    `boosted-chews-system`,

    ];

Theme.Valid = (theme) => {

    assert(availableThemes.includes(theme));

    return theme;

};

Theme.events = new EventEmitter();

lsTheme.events.on(`change`, (newTheme) => {

    try {

        newTheme = Theme.Valid(newTheme);

    } catch (error) {

        newTheme = defaultTheme;

    }

    if (theme !== newTheme) {

        theme = newTheme;

        Theme.events.emit(`change`, theme);

    }

});

Theme.set = (newTheme) => lsTheme.write(Theme.Valid(newTheme));

module.exports = Theme;
