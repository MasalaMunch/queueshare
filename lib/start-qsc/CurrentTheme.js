"use strict";

const assert = require(`assert`);
const cookies = require(`js-cookie`);
const EventEmitter = require(`events`);
const LsJson = require(`../ls-json`);

const Theme = require(`../qsc-theme`);

const lsTheme = new LsJson(`theme`);

let theme = Theme.default;

const setCookie = () => cookies.set(`theme`, theme, {expires: 365 * 250});

//^ https://www.quora.com/What-is-the-limit-to-a-persistent-cookies-expiry-date#:~:text=For%20all%20intents%20and%20purposes,(as%20of%20August%202019).

const CurrentTheme = () => theme;

CurrentTheme.events = new EventEmitter();

lsTheme.events.on(`change`, (newTheme) => {

    try {

        theme = Theme.Valid(newTheme);

    } catch (error) {

        theme = Theme.default;

    }

    setCookie();

    CurrentTheme.events.emit(`change`, theme);

});

CurrentTheme.startEmitting = () => lsTheme.startEmitting();

CurrentTheme.set = (newTheme) => {

    theme = Theme.Valid(newTheme);

    setCookie();

    lsTheme.write(theme);

};

module.exports = CurrentTheme;
