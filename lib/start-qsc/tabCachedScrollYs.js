"use strict";

const Tab = require(`./Tab.js`);

const tabCachedScrollYs = {};

for (const tab of Tab.all) {

    tabCachedScrollYs[tab] = 0;

}

module.exports = tabCachedScrollYs;
