"use strict";

const Focus = require(`./Focus.js`);
const Tab = require(`./Tab.js`);

const tabFocuses = {};

for (const tab of Tab.all) {

    tabFocuses[tab] = Focus.default;

}

module.exports = tabFocuses;
