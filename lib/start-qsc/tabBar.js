"use strict";

const Elm = require(`../elm`);

const OrderedTabs = require(`./OrderedTabs.js`);
const tabButtons = require(`./tabButtons.js`);

const tabBar = Elm(`nav`, {id: `tab-bar`});

OrderedTabs.events.on(`change`, (orderedTabs) => {

    Elm.fill(tabBar, orderedTabs.map((tab) => tabButtons[tab]));

});

module.exports = tabBar;
