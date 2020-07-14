"use strict";

const Elm = require(`../elm`);

const CurrentTheme = require(`./CurrentTheme.js`);
const fabContainer = require(`./fabContainer.js`);
const header = require(`./header.js`);
const orderedTabs = require(`./orderedTabs.js`);
const syncedState = require(`./syncedState.js`);
const Tab = require(`./Tab.js`);
const tabBar = require(`./tabBar.js`);
const tabButtons = require(`./tabButtons.js`);
const tabMains = require(`./tabMains.js`);
const tabSearchForms = require(`./tabSearchForms.js`);
const ui = require(`./ui.js`);

const start = () => {

    CurrentTheme.events.on(`change`, (theme) => {

        document.body.dataset.theme = theme;

    });

    CurrentTheme.events.start();

    syncedState.events.on(`change`, console.log);

    syncedState.events.start();

    Tab.events.on(`change`, (tab) => {

        for (const otherTab of orderedTabs) {

            tabButtons[otherTab].classList.remove(`current`);

        }

        tabButtons[tab].classList.add(`current`);

        Elm.fill(header, [tabBar, tabSearchForms[tab]]);

        Elm.fill(ui, [header, tabMains[tab], fabContainer]);

    });

    Tab.events.start();

    Elm.fill(document.body, [ui]);

    Object.assign(window, {CurrentTheme, syncedState, Tab});

};

module.exports = start;
