"use strict";

const Elm = require(`../elm`);

const orderedTabs = require(`./orderedTabs.js`);
const Tab = require(`./Tab.js`);

const tabButtons = {};

for (const tab of orderedTabs) {

    tabButtons[tab] = Elm(`button`, {

        ariaLabel: tab,

        type: `button`,

        onclick: () => Tab.set(tab),

        childNodes: [

            Elm(`img`, {

                ariaHidden: true,

                className: `icon`,

                src: `/clientAssets/logoCenter.svg`,

                }),

            Elm(`span`, {ariaHidden: true, className: `name`, innerText: tab}),

            ],

        });

}

module.exports = tabButtons;