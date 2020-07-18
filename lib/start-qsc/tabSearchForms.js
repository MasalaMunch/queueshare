"use strict";

const Elm = require(`../elm`);

const RecentSearches = require(`./RecentSearches.js`);
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

                onblur () {

                    if (this.value.length > 0) {

                        RecentSearches.add(this.value);

                    }

                },

                placeholder: `Search...`,

                type: `search`,

                }),

            ],

        });

}

module.exports = tabSearchForms;
