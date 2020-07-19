"use strict";

const Elm = require(`../elm`);

const CurrentTab = require(`./CurrentTab.js`);
const CurrentTheme = require(`./CurrentTheme.js`);
const enableKbControls = require(`./enableKbControls.js`);
const enableTabSwiping = require(`./enableTabSwiping.js`);
const fabContainer = require(`./fabContainer.js`);
const KbFocus = require(`./KbFocus.js`);
const header = require(`./header.js`);
const InitialTab = require(`./InitialTab.js`);
const OrderedTabs = require(`./OrderedTabs.js`);
const RecentSearches = require(`./RecentSearches.js`);
const syncedState = require(`./syncedState.js`);
const tabBar = require(`./tabBar.js`);
const tabBarBackground = require(`./tabBarBackground.js`);
const tabButtons = require(`./tabButtons.js`);
const tabCachedKbFocuses = require(`./tabCachedKbFocuses.js`);
const tabCachedScrollYs = require(`./tabCachedScrollYs.js`);
const tabMains = require(`./tabMains.js`);
const tabSearchForms = require(`./tabSearchForms.js`);
const ui = require(`./ui.js`);

const start = () => {

    CurrentTab.events.on(`change`, (newTab, oldTab) => {

        if (oldTab === undefined) {

            header.append(tabBarBackground, tabBar, tabSearchForms[newTab]);

            ui.append(header, tabMains[newTab], fabContainer);

        }
        else {

            tabCachedKbFocuses[oldTab] = KbFocus();

            tabCachedScrollYs[oldTab] = scrollY;

            header.replaceChild(tabSearchForms[newTab], tabSearchForms[oldTab]);

            ui.replaceChild(tabMains[newTab], tabMains[oldTab]);

            tabButtons[oldTab].classList.remove(`current`);

        }

        KbFocus.set(undefined);

        const button = tabButtons[newTab];

        button.classList.add(`current`);

        scrollTo(scrollX, tabCachedScrollYs[newTab]);

        button.scrollIntoView();

    });

    CurrentTab.events.start();

    CurrentTheme.events.on(`change`, (theme) => {

        document.body.dataset.theme = theme;

    });

    CurrentTheme.events.start();

    enableKbControls();

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

        KbFocus,

        OrderedTabs, 

        RecentSearches,

        syncedState,

        tabCachedKbFocuses,

        tabCachedScrollYs, 

        });

};

module.exports = start;
