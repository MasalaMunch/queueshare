"use strict";

const assert = require(`assert`);
const EventEmitter = require(`events`);
const LsJson = require(`../ls-json`);

const defaultTheme = require(`../default-qsc-theme`);

let theme;

const Theme = () => theme;

const lsTheme = new LsJson(`theme`);

Theme.Valid = (theme) => {

    assert([`dark`, `light`, `system`].includes(theme));

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
