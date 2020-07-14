"use strict";

const Elm = require(`../elm`);

const orderedTabs = require(`./orderedTabs.js`);
const tabButtons = require(`./tabButtons.js`);

const tabBar = Elm(`nav`, {

    id: `tab-bar`,

    childNodes: orderedTabs.map((tab) => tabButtons[tab]),
    
    });

module.exports = tabBar;
