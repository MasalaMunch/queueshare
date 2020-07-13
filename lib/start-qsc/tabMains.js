"use strict";

const Elm = require(`../elm`);

const orderedTabs = require(`./orderedTabs.js`);

const tabMains = {};

for (const tab of orderedTabs) {

    tabMains[tab] = Elm(`main`, {

        childNodes: [

            Elm(`ul`, {

                id: `list`,

                childNodes: (

                    [Elm(`li`, {innerText: `special ${tab} item`, className: `special`})]

                    .concat((new Array(50)).fill().map((e, i) => {

                        return Elm(`li`, {innerText: `${i}: normal ${tab} item`});


                    }))

                    ),

                }),

            ],

        });

}

module.exports = tabMains;
