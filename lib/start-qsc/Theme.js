"use strict";

const assert = require(`assert`);
const EventEmitter = require(`events`);
const LsJson = require(`../ls-json`);

let theme;

const Theme = () => theme;

Theme.Valid = (theme) => {

    assert([`dark`, `light`].includes(theme));

    return theme;

};

Theme.events = new EventEmitter();

const lsTheme = new LsJson(`theme`);

lsTheme.events.on(`change`, (newTheme) => {

    try {

        newTheme = Theme.Valid(newTheme);

    } catch (error) {

        newTheme = `dark`;

    }

    if (theme !== newTheme) {

        theme = newTheme;

        Theme.events.emit(`change`, theme);

    }

});

Theme.set = (theme) => lsTheme.write(Theme.Valid(theme));

module.exports = Theme;
