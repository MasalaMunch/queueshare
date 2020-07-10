"use strict";

const Elm = require(`../elm`);

const orderedTabs = require(`./orderedTabs.js`);

const tabSearchForms = {};

for (const tab of orderedTabs) {

    tabSearchForms[tab] = Elm(`form`, {

        id: `search-form`,

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

console.log(tabSearchForms);

module.exports = tabSearchForms;
