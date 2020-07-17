"use strict";

const Elm = require(`../elm`);

const CurrentTab = require(`./CurrentTab.js`);
const CurrentTheme = require(`./CurrentTheme.js`);
const enableTabSwiping = require(`./enableTabSwiping.js`);
const fabContainer = require(`./fabContainer.js`);
const header = require(`./header.js`);
const InitialTab = require(`./InitialTab.js`);
const OrderedTabs = require(`./OrderedTabs.js`);
const RecentSearches = require(`./RecentSearches.js`);
const syncedState = require(`./syncedState.js`);
const tabBar = require(`./tabBar.js`);
const tabBarBackground = require(`./tabBarBackground.js`);
const tabButtons = require(`./tabButtons.js`);
const tabFocuses = require(`./tabFocuses.js`);
const tabMains = require(`./tabMains.js`);
const tabScrollYs = require(`./tabScrollYs.js`);
const tabSearchForms = require(`./tabSearchForms.js`);
const ui = require(`./ui.js`);

const start = () => {

    CurrentTab.events.on(`change`, (newTab, oldTab) => {

        if (oldTab === undefined) {

            header.append(tabBarBackground, tabBar, tabSearchForms[newTab]);

            ui.append(header, tabMains[newTab], fabContainer);

        }
        else {

            tabFocuses[oldTab] = document.activeElement;

            tabScrollYs[oldTab] = scrollY;

            header.replaceChild(tabSearchForms[newTab], tabSearchForms[oldTab]);

            ui.replaceChild(tabMains[newTab], tabMains[oldTab]);

            tabButtons[oldTab].classList.remove(`current`);

        }

        const button = tabButtons[newTab];

        button.classList.add(`current`);

        scrollTo(scrollX, tabScrollYs[newTab]);

        button.scrollIntoView();

    });

    CurrentTab.events.start();

    Elm.on(document, `keydown`, (e) => {

        if (e.key === `Tab`) {

            e.preventDefault();

            CurrentTab.set(

                e.shiftKey? CurrentTab.Previous() : CurrentTab.Next()

                );

            const focus = tabFocuses[CurrentTab()];

            if (focus !== null) {

                focus.focus();

            }

        }

    });

    CurrentTheme.events.on(`change`, (theme) => {

        document.body.dataset.theme = theme;

    });

    CurrentTheme.events.start();

    enableTabSwiping();

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

        tabFocuses,

        tabScrollYs, 

        });

};

module.exports = start;
