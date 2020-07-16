"use strict";

const Elm = require(`../elm`);

const CurrentTab = require(`./CurrentTab.js`);
const CurrentTheme = require(`./CurrentTheme.js`);
const fabContainer = require(`./fabContainer.js`);
const header = require(`./header.js`);
const InitialTab = require(`./InitialTab.js`);
const OrderedTabs = require(`./OrderedTabs.js`);
const RecentSearches = require(`./RecentSearches.js`);
const syncedState = require(`./syncedState.js`);
const tabBar = require(`./tabBar.js`);
const tabButtons = require(`./tabButtons.js`);
const tabMains = require(`./tabMains.js`);
const tabScrollYs = require(`./tabScrollYs.js`);
const tabSearchForms = require(`./tabSearchForms.js`);
const ui = require(`./ui.js`);

const start = () => {

    CurrentTab.events.on(`change`, (newTab, oldTab) => {

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

        if (matchMedia(`(hover: hover) and (pointer: fine)`)) {

        //^ https://stackoverflow.com/a/47703337

            tabSearchForms[newTab].Input().focus();

        }

    });

    CurrentTab.events.start();

    Elm.on(document, `keydown`, (e) => {

        if (e.key === `Tab`) {

            e.preventDefault();

            if (e.shiftKey) {

                CurrentTab.set(CurrentTab.Previous());

            }
            else {

                CurrentTab.set(CurrentTab.Next());

            }

        }

    });

    CurrentTheme.events.on(`change`, (theme) => {

        document.body.dataset.theme = theme;

    });

    CurrentTheme.events.start();

    OrderedTabs.events.on(`change`, (orderedTabs) => {

        Elm.fill(tabBar, orderedTabs.map((tab) => tabButtons[tab]));

    });

    OrderedTabs.events.start();

    syncedState.events.on(`change`, console.log);

    syncedState.events.start();

    Elm.fill(document.body, [ui]);

    Object.assign(window, {

        CurrentTab, 

        CurrentTheme, 

        InitialTab,

        OrderedTabs, 

        RecentSearches,

        syncedState,

        });

};

module.exports = start;
