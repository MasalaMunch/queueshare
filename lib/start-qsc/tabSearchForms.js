"use strict";

const Elm = require(`../elm`);

const Tab = require(`./Tab.js`);
const tabNames = require(`./tabNames.js`);

const tabSearchForms = {};

for (const tab of Tab.all) {

    tabSearchForms[tab] = Elm(`form`, {

        action: ``,

        onsubmit () {

            const input = this.querySelector(`input`);

            console.log(input.value);

            input.blur();

            return false;

        },

        childNodes: [

            Elm(`input`, {

                ariaLabel: `Search ${tabNames[tab]}`,

                autocomplete: `off`,

                id: `search-bar`,

                placeholder: `Search...`,

                type: `search`,

                }),

            ],

        });

}

module.exports = tabSearchForms;
