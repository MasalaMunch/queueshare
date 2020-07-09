"use strict";

const assert = require(`assert`);
const EventEmitter = require(`events`);
const LsJson = require(`../ls-json`);

const lsTheme = new LsJson(`theme`);

const validThemes = new Set([`dark`, `light`]);

const Valid = (theme) => {

    assert(validThemes.has(theme));

    return theme;

};

const defaultTheme = `dark`;

let theme = defaultTheme;

const Theme = () => theme;

Theme.events = new EventEmitter();

lsTheme.events.on(`change`, (newTheme) => {

    try {

        theme = Valid(newTheme);

    } catch (error) {

        theme = defaultTheme;

    }

    Theme.events.emit(`change`, theme);

});

Theme.startEmitting = () => lsTheme.startEmitting();

Theme.set = (theme) => lsTheme.write(Valid(theme));

module.exports = Theme;
