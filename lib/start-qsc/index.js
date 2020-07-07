"use strict";

const clearElm = require(`../clear-elm`);
const removeElm = require(`../remove-elm`);

const fab = require(`./fab.js`);
const syncedState = require(`./syncedState.js`);
const Tab = require(`./Tab.js`);
const tabScreens = require(`./tabScreens.js`);
const Theme = require(`./Theme.js`);

const start = () => {

    syncedState.events.on(`change`, console.log);

    Tab.events.on(`change`, (tab) => {

        clearElm(document.body);

        document.body.append(tabScreens[tab], fab);

    });

    Theme.events.on(`change`, (theme) => document.body.dataset.theme = theme);

    document.body.querySelectorAll(`.data`).forEach(removeElm);

    window.Tab = Tab;

    window.Theme = Theme;

};

module.exports = start;
