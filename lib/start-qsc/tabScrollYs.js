"use strict";

const Tab = require(`./Tab.js`);

const tabScrollYs = {};

for (const tab of Tab.all) {

    tabScrollYs[tab] = 0;

}

module.exports = tabScrollYs;
