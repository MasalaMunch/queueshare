"use strict";

const Tab = require(`./Tab.js`);

const tabCachedKbFocuses = {};

for (const tab of Tab.all) {

    tabCachedKbFocuses[tab] = undefined;

}

module.exports = tabCachedKbFocuses;
