"use strict";

const Elm = require(`../elm`);

const CurrentTheme = require(`./CurrentTheme.js`);
const fabContainer = require(`./fabContainer.js`);
const header = require(`./header.js`);
const syncedState = require(`./syncedState.js`);
const Tab = require(`./Tab.js`);
const tabBar = require(`./tabBar.js`);
const tabButtons = require(`./tabButtons.js`);
const tabMains = require(`./tabMains.js`);
const tabScrollYs = require(`./tabScrollYs.js`);
const tabSearchForms = require(`./tabSearchForms.js`);
const ui = require(`./ui.js`);

const start = () => {

    CurrentTheme.events.on(`change`, (theme) => {

        document.body.dataset.theme = theme;

    });

    CurrentTheme.events.start();

    syncedState.events.on(`change`, console.log);

    syncedState.events.start();

    Tab.events.on(`change`, (newTab, oldTab) => {

        if (oldTab === undefined) {

            header.append(tabBar, tabSearchForms[newTab]);

            ui.append(header, tabMains[newTab], fabContainer);

        }
        else {

            tabScrollYs[oldTab] = scrollY;

            header.replaceChild(tabSearchForms[newTab], tabSearchForms[oldTab]);

            ui.replaceChild(tabMains[newTab], tabMains[oldTab]);

            tabButtons[oldTab].classList.remove(`current`);

        }

        tabButtons[newTab].classList.add(`current`);

        scrollTo(scrollX, tabScrollYs[newTab]);

    });

    Tab.events.start();

    Elm.clear(document.body);

    document.body.append(ui);

    Object.assign(window, {CurrentTheme, syncedState, Tab});

};

module.exports = start;
