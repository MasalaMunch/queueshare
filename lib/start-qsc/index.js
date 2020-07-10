"use strict";

const Elm = require(`../elm`);

const CurrentTab = require(`./CurrentTab.js`);
const CurrentTheme = require(`./CurrentTheme.js`);
const fabContainer = require(`./fabContainer.js`);
const htmlData = require(`./htmlData.js`);
const syncedState = require(`./syncedState.js`);
const tabMains = require(`./tabMains.js`);
const ui = require(`./ui.js`);

const start = () => {

    CurrentTab.events.on(`change`, (tab) => {

        Elm.clear(ui);

        ui.append(tabMains[tab], fabContainer);

    });

    CurrentTab.startEmitting();

    CurrentTheme.events.on(`change`, (theme) => ui.dataset.theme = theme);

    CurrentTheme.startEmitting();

    syncedState.events.on(`change`, console.log);

    syncedState.startEmitting();

    Elm.clear(document.body);

    document.body.append(ui);

    Object.assign(window, {CurrentTab, CurrentTheme, htmlData, syncedState, tabMains});

};

module.exports = start;
