"use strict";

const assert = require(`assert`);
const EventEmitter = require(`events`);
const StoredJson = require(`../stored-json`);

const defaultTheme = require(`../default-qsc-theme`);
const log = require(`./log.js`);

let theme;

const Theme = () => theme;

Theme.Valid = (theme) => {

    assert(theme === `dark` || theme === `light` || theme === `system`);

    return theme;

};

const storedTheme = new StoredJson(`theme`);

Theme.events = new EventEmitter();

Theme.set = (newTheme) => {

    newTheme = Theme.Valid(newTheme);

    if (theme !== newTheme) {

        theme = newTheme;

        storedTheme.write(theme);

        Theme.events.emit(`change`, theme);

    }

};

process.nextTick(() => {

    let initialTheme;

    try {

        initialTheme = Theme.Valid(storedTheme.Value());

    } catch (error) {

        log(error);

        initialTheme = defaultTheme;

    }

    Theme.set(initialTheme);

});

module.exports = Theme;
