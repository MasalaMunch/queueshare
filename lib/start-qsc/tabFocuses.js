"use strict";

const Tab = require(`./Tab.js`);

const tabFocuses = {};

for (const tab of Tab.all) {

    tabFocuses[tab] = null;

}

module.exports = tabFocuses;
