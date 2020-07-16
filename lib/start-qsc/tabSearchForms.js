"use strict";

const Elm = require(`../elm`);

const RecentSearches = require(`./RecentSearches.js`);
const Tab = require(`./Tab.js`);

const tabSearchForms = {};

for (const tab of Tab.all) {

    tabSearchForms[tab] = Elm(`form`, {

        action: ``,

        onsubmit () {

            const input = this.querySelector(`input`);

            input.blur();

            console.log(input.value);

            if (input.value.length > 0) {

                RecentSearches.add(input.value);                

            }

            return false;

        },

        childNodes: [

            Elm(`input`, {

                autocomplete: `off`,

                id: `search-bar`,

                placeholder: `Search...`,

                type: `search`,

                }),

            ],

        });

}

module.exports = tabSearchForms;
