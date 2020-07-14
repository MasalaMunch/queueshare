"use strict";

const Elm = require(`../elm`);

const orderedTabs = require(`./orderedTabs.js`);

const tabSearchForms = {};

for (const tab of orderedTabs) {

    tabSearchForms[tab] = Elm(`form`, {

        childNodes: [

            Elm(`input`, {

                id: `search-bar`,

                placeholder: `Search...`,

                type: `text`,

                }),

            ],

        onsubmit: () => false,

        });

}

module.exports = tabSearchForms;
