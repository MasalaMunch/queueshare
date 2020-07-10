"use strict";

const Elm = require(`../elm`);

const orderedTabs = require(`./orderedTabs.js`);
const Tab = require(`./Tab.js`);

const tabBar = Elm(`nav`, {

    className: `tab-bar`,

    childNodes: orderedTabs.map((tab) => Elm(`button`, {

        type: `button`,

        childNodes: [

            Elm(`img`, {

                ariaHidden: true,

                className: `icon`,

                src: `/clientAssets/logoCenter.svg`,

                }),

            Elm(`span`, {innerText: tab}),

            ],

        onclick: () => Tab.set(tab),

        })),

    });

module.exports = tabBar;
