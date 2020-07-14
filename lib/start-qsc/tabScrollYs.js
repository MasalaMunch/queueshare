"use strict";

const orderedTabs = require(`./orderedTabs.js`);

const tabScrollYs = {};

for (const tab of orderedTabs) {

    tabScrollYs[tab] = 0;

}

module.exports = tabScrollYs;
