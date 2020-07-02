"use strict";

const Elm = require(`../elm`);

const orderedTabs = require(`./orderedTabs.js`);

const tabScreens = {};

for (const tab of orderedTabs) {

    tabScreens[tab] = Elm(`ul`, {

        className: `screen`, 

        childNodes: [

            Elm(`li`, {innerText: `special ${tab} item`, className: `special`}),

            Elm(`li`, {innerText: `normal ${tab} item`}),

            ],

        });

}

module.exports = tabScreens;
