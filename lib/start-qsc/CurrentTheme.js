"use strict";

const cookies = require(`js-cookie`);
const LsJson = require(`../ls-json`);
const SafeEventEmitter = require(`../safe-event-emitter`);

const Theme = require(`../qsc-theme`);

const lsTheme = new LsJson(`theme`, Theme.Valid, Theme.default);

const CurrentTheme = () => lsTheme.Value();

const setCookie = () => {

    cookies.set(`theme`, CurrentTheme(), {expires: 365 * 250});

    //^ https://www.quora.com/What-is-the-limit-to-a-persistent-cookies-expiry-date#:~:text=For%20all%20intents%20and%20purposes,(as%20of%20August%202019).

};

CurrentTheme.events = new SafeEventEmitter();

lsTheme.events.on(`change`, () => {
 
    CurrentTheme.events.emit(`change`, CurrentTheme());

    setCookie();

});

CurrentTheme.events.once(`hasStarted`, () => lsTheme.events.start());

CurrentTheme.set = (theme) => {

    lsTheme.write(theme);

    setCookie();

};

module.exports = CurrentTheme;
