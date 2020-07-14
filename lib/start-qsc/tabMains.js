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

                    [Elm(`li`, {innerText: `0: special ${tab} item`, className: `special`})]

                    .concat((new Array(50)).fill().map((e, i) => {

                        return Elm(`li`, {innerText: `${i+1}: normal ${tab} item`});


                    }))

                    ),

                }),

            ],

        });

}

module.exports = tabMains;
