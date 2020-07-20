"use strict";

const Elm = require(`../elm`);

const CurrentTab = require(`./CurrentTab.js`);
const CurrentTheme = require(`./CurrentTheme.js`);
const enableKbControls = require(`./enableKbControls.js`);
const enableTabSwiping = require(`./enableTabSwiping.js`);
const OrderedTabs = require(`./OrderedTabs.js`);
const syncedState = require(`./syncedState.js`);
const tabButtons = require(`./tabButtons.js`);
const ui = require(`./ui.js`);

const start = () => {

    CurrentTab.events.on(`change`, (newTab, oldTab) => {

        tabButtons[newTab].scrollIntoView();

        scrollTo(scrollX, ui.tabCachedScrollYs[newTab]);

    });

    CurrentTab.events.start();

    CurrentTheme.events.on(`change`, (theme) => {

        document.body.dataset.theme = theme;

    });

    CurrentTheme.events.start();

    enableKbControls();

    enableTabSwiping();

    OrderedTabs.events.start();

    syncedState.events.on(`change`, console.log);

    syncedState.events.start();

    Elm.fill(document.body, [ui]);

    Object.assign(window, {syncedState});

};

module.exports = start;
