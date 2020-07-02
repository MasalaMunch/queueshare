"use strict";

const clearElm = require(`../clear-elm`);

const fab = require(`./fab.js`);
const syncedState = require(`./syncedState.js`);
const Tab = require(`./Tab.js`);
const tabScreens = require(`./tabScreens.js`);
const Theme = require(`./Theme.js`);

const start = () => {

    window.Tab = Tab;

    window.Theme = Theme;

    const updateScreen = () => {

        const tab = Tab();

        if (syncedState.gotInitialChanges && tab !== undefined) {

            clearElm(document.body);

            document.body.appendChild(tabScreens[tab]);

            document.body.appendChild(fab);

        }

    };

    syncedState.events.once(`gotInitialChanges`, updateScreen);

    Tab.events.on(`change`, updateScreen);

    const updateTheme = () => {

        const theme = Theme();

        if (syncedState.gotInitialChanges && theme !== undefined) {

            document.body.dataset.theme = theme;

        }


    };

    syncedState.events.once(`gotInitialChanges`, updateTheme);

    Theme.events.on(`change`, updateTheme);

};

module.exports = start;
