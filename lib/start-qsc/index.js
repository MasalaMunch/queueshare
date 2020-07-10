"use strict";

const Elm = require(`../elm`);

const CurrentTheme = require(`./CurrentTheme.js`);
const fabContainer = require(`./fabContainer.js`);
const htmlData = require(`./htmlData.js`);
const syncedState = require(`./syncedState.js`);
const Tab = require(`./Tab.js`);
const tabMains = require(`./tabMains.js`);
const ui = require(`./ui.js`);

const start = () => {

    CurrentTheme.events.on(`change`, (theme) => ui.dataset.theme = theme);

    CurrentTheme.startEmitting();

    syncedState.events.on(`change`, console.log);

    syncedState.startEmitting();

    Tab.events.on(`change`, (tab) => {

        Elm.clear(ui);

        ui.append(tabMains[tab], fabContainer);

    });

    Tab.startEmitting();

    Elm.clear(document.body);

    document.body.append(ui);

    Object.assign(window, {CurrentTheme, htmlData, syncedState, Tab, tabMains});

};

module.exports = start;
