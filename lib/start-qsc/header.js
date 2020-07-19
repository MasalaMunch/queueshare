"use strict";

const Elm = require(`../elm`);

const CurrentTab = require(`./CurrentTab.js`);
const tabBar = require(`./tabBar.js`);
const tabBarBackground = require(`./tabBarBackground.js`);
const tabSearchForms = require(`./tabSearchForms.js`);

const header = Elm(`header`);

CurrentTab.events.on(`change`, (newTab, oldTab) => {

    if (oldTab === undefined) {

        header.append(tabBarBackground, tabBar, tabSearchForms[newTab]);

    }
    else {

        header.replaceChild(tabSearchForms[newTab], tabSearchForms[oldTab]);

    }

});

module.exports = header;
