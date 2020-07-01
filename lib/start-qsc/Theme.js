"use strict";

const assert = require(`assert`);
const EventEmitter = require(`events`);
const LsJson = require(`../ls-json`);

const syncedState = require(`./syncedState.js`);

let theme;

const Theme = () => theme;

Theme.Valid = (theme) => {

    assert([`dark`, `light`, `system`].includes(theme));

    return theme;

};

Theme.events = new EventEmitter();

const lsTheme = new LsJson(`theme`);

const updateTheme = () => {

    if (syncedState.gotInitialChanges) {

        let newTheme;

        try {

            newTheme = Theme.Valid(lsTheme.Value());

        } catch (error) {

            newTheme = `dark`;

        }

        if (theme !== newTheme) {

            theme = newTheme;

            Theme.events.emit(`change`, theme);

        }

    }

};

syncedState.events.once(`gotInitialChanges`, updateTheme);

lsTheme.events.on(`change`, updateTheme);

Theme.set = (newTheme) => lsTheme.write(Theme.Valid(newTheme));

module.exports = Theme;
