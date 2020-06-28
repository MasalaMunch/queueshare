"use strict";

const assert = require(`assert`);
const EventEmitter = require(`events`);
const StoredJson = require(`../stored-json`);

const defaultTheme = require(`../default-qsc-theme`);

let theme;

const Theme = () => theme;

const ValidTheme = (theme) => {

    assert(typeof theme === `string`);

    return theme;

};

const storedTheme = new StoredJson(path.join(`qsc`, `theme`));

Theme.events = new EventEmitter();

Theme.set = (newTheme) => {

    newTheme = ValidTheme(newTheme);

    if (theme !== newTheme) {

        theme = newTheme;

        storedTheme.write(newTheme);

        Theme.events.emit(`change`, theme);

    }

};

const storedThemeValue = storedTheme.Value();

let initialTheme;

if (storedThemeValue === undefined) {

    initialTheme = defaultTheme;

}
else {

    try {

        initialTheme = ValidTheme(storedThemeValue);

    } catch (error) {

        console.error(error);

        initialTheme = defaultTheme;

    }

}

process.nextTick(() => Theme.set(initialTheme));

module.exports = Theme;
