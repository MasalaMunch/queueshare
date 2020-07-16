"use strict";

const Elm = require(`../elm`);

const Tab = require(`./Tab.js`);

const tabSearchForms = {};

for (const tab of Tab.all) {

    tabSearchForms[tab] = Elm(`form`, {

        action: ``,

        childNodes: [

            Elm(`input`, {

                id: `search-bar`,

                placeholder: `Search...`,

                type: `search`,

                }),

            ],

        onsubmit: () => false,

        });

}

module.exports = tabSearchForms;
