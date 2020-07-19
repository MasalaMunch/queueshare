"use strict";

const Elm = require(`../elm`);

const CurrentTab = require(`./CurrentTab.js`);
const fabContainer = require(`./fabContainer.js`);
const header = require(`./header.js`);
const Tab = require(`./Tab.js`);
const tabMains = require(`./tabMains.js`);

const tabCachedScrollYs = {};

const ui = Elm(`div`, {

    id: `ui`, 

    CachedScrollY: (tab) => tabCachedScrollYs[Tab.Valid(tab)],

    });

for (const tab of Tab.all) {

    tabCachedScrollYs[tab] = 0;

}

CurrentTab.events.on(`change`, (newTab, oldTab) => {

    if (oldTab === undefined) {

        ui.append(header, tabMains[newTab], fabContainer);

    }
    else {

        tabCachedScrollYs[oldTab] = scrollY;

        ui.replaceChild(tabMains[newTab], tabMains[oldTab]);

    }

});

module.exports = ui;
