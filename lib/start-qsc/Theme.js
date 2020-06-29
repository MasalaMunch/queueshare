"use strict";

const assert = require(`assert`);
const EventEmitter = require(`events`);
const LsJson = require(`../ls-json`);

const defaultTheme = require(`../default-qsc-theme`);
const log = require(`./log.js`);

let theme;

const Theme = () => theme;

const lsTheme = new LsJson(`theme`);

Theme.events = new EventEmitter();

lsTheme.events.on(`change`, (newTheme) => {

    if (![`dark`, `light`, `system`].includes(newTheme)) {

        newTheme = defaultTheme;        

    }

    if (theme !== newTheme) {

        theme = newTheme;

        Theme.events.emit(`change`, theme);

    }

});

Theme.set = (newTheme) => lsTheme.write(newTheme);

module.exports = Theme;
