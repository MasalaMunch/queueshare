"use strict";

const clearElm = require(`../clear-elm`);
const removeElm = require(`../remove-elm`);

const CurrentTab = require(`./CurrentTab.js`);
const CurrentTheme = require(`./CurrentTheme.js`);
const fab = require(`./fab.js`);
const syncedState = require(`./syncedState.js`);
const tabScreens = require(`./tabScreens.js`);

const start = () => {

    CurrentTab.events.on(`change`, (tab) => {

        // clearElm(document.body);

        // document.body.append(tabScreens[tab], fab);

    });

    CurrentTab.startEmitting();

    CurrentTheme.events.on(`change`, (theme) => {

        document.body.dataset.theme = theme;

    });

    CurrentTheme.startEmitting();

    syncedState.events.on(`change`, console.log);

    syncedState.startEmitting();

    window.CurrentTab = CurrentTab;

    window.CurrentTheme = CurrentTheme;

};

module.exports = start;
