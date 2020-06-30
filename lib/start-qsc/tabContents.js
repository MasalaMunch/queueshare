"use strict";

const Elm = require(`../elm`);

const orderedTabs = require(`./orderedTabs.js`);

const tabContents = {};

for (const tab of orderedTabs) {

    tabContents[tab] = Elm(`ul`, {

        classList: [`content`, tab], 

        childNodes: [Elm(`li`, {innerText: tab})],

        });

}

module.exports = tabContents;
