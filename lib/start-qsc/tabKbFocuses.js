"use strict";

const KbFocus = require(`./KbFocus.js`);
const Tab = require(`./Tab.js`);

const tabKbFocuses = {};

for (const tab of Tab.all) {

    tabKbFocuses[tab] = KbFocus.default;

}

module.exports = tabKbFocuses;
