"use strict";

const Elm = require(`../elm`);

const fabContainer = require(`./fabContainer.js`);
const htmlData = require(`./htmlData.js`);
const syncedState = require(`./syncedState.js`);
const Tab = require(`./Tab.js`);
const tabMains = require(`./tabMains.js`);
const Theme = require(`./Theme.js`);
const ui = require(`./ui.js`);

const start = () => {

    syncedState.events.on(`change`, console.log);

    syncedState.startEmitting();

    Tab.events.on(`change`, (tab) => {

        Elm.clear(ui);

        ui.append(tabMains[tab], fabContainer);

    });

    Tab.startEmitting();

    Theme.events.on(`change`, (theme) => ui.dataset.theme = theme);

    Theme.startEmitting();

    Elm.clear(document.body);

    document.body.append(ui);
 
    window.htmlData = htmlData;

    window.Tab = Tab;

    window.Theme = Theme;

};

module.exports = start;
