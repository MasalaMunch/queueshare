"use strict";

const assert = require(`assert`);
const EventEmitter = require(`events`);
const LsJson = require(`../ls-json`);

const Tab = require(`./Tab.js`);

let theme;

const Theme = () => theme;

Theme.Valid = (theme) => {

    assert([`dark`, `light`].includes(theme));

    return theme;

};

Theme.events = new EventEmitter();

const lsTheme = new LsJson(`theme`);

const updateTheme = () => {

    if (Tab() !== undefined) {

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

Tab.events.once(`change`, updateTheme);

lsTheme.events.on(`change`, updateTheme);

Theme.set = (newTheme) => lsTheme.write(Theme.Valid(newTheme));

module.exports = Theme;
