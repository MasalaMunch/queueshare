"use strict";

const Elm = require(`../elm`);

const CurrentTheme = require(`./CurrentTheme.js`);
const fabContainer = require(`./fabContainer.js`);
const header = require(`./header.js`);
const htmlData = require(`./htmlData.js`);
const syncedState = require(`./syncedState.js`);
const Tab = require(`./Tab.js`);
const tabBar = require(`./tabBar.js`);
const tabMains = require(`./tabMains.js`);
const tabSearchForms = require(`./tabSearchForms.js`);
const ui = require(`./ui.js`);

const start = () => {

    CurrentTheme.events.on(`change`, (theme) => ui.dataset.theme = theme);

    CurrentTheme.startEmitting();

    syncedState.events.on(`change`, console.log);

    syncedState.startEmitting();

    Tab.events.on(`change`, (tab) => {

        Elm.fill(header, [tabBar, tabSearchForms[tab]]);

        Elm.fill(ui, [header, tabMains[tab], fabContainer]);

    });

    Tab.startEmitting();

    Elm.fill(document.body, [ui]);

    Object.assign(window, {CurrentTheme, htmlData, syncedState, Tab, tabMains});

};

module.exports = start;
