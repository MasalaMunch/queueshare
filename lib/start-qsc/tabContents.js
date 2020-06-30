"use strict";

const Elm = require(`../elm`);

const orderedTabs = require(`./orderedTabs.js`);

const tabContents = {};

for (const tab of orderedTabs) {

    tabContents[tab] = Elm(`ul`, {

        className: `content`, 

        childNodes: [

            Elm(`li`, {innerText: `special ${tab} item`, className: `special`}),

            Elm(`li`, {innerText: `normal ${tab} item`}),

            ],

        });

}

module.exports = tabContents;
