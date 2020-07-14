"use strict";

const cookies = require(`js-cookie`);
const LsJson = require(`../ls-json`);
const SafeEventEmitter = require(`../safe-event-emitter`);

const Theme = require(`../qsc-theme`);

let theme = Theme.default;

const setCookie = () => cookies.set(`theme`, theme, {expires: 365 * 250});

//^ https://www.quora.com/What-is-the-limit-to-a-persistent-cookies-expiry-date#:~:text=For%20all%20intents%20and%20purposes,(as%20of%20August%202019).

const CurrentTheme = () => theme;

CurrentTheme.events = new SafeEventEmitter();

const lsTheme = new LsJson(`theme`);

lsTheme.events.on(`change`, (newTheme) => {

    try {

        theme = Theme.Valid(newTheme);

    } catch (error) {

        theme = Theme.default;

    }

    setCookie();

    CurrentTheme.events.emit(`change`, theme);

});

CurrentTheme.events.once(`hasStarted`, () => lsTheme.events.start());

CurrentTheme.set = (newTheme) => {

    theme = Theme.Valid(newTheme);

    setCookie();

    lsTheme.write(theme);

};

module.exports = CurrentTheme;
