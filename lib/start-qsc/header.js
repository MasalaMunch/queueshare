"use strict";

const Elm = require(`../elm`);

const orderedTabs = require(`./orderedTabs.js`);
const Tab = require(`./Tab.js`);

const header = Elm(`header`, {

    childNodes: [

        // Elm(`form`, {

        //     className: `search-form`,

        //     childNodes: [

        //         Elm(`input`, {

        //             className: `search-bar`,

        //             placeholder: `Search...`,

        //             type: `text`,

        //             }),

        //         ],

        //     onsubmit: () => false,

        //     }),

        Elm(`nav`, {

            className: `tab-bar`,

            childNodes: orderedTabs.map((tab) => Elm(`button`, {

                type: `button`,

                childNodes: [

                    Elm(`img`, {

                        src: `/clientAssets/logoCenter.svg`,

                        aria: {hidden: `true`},

                        }),

                    Elm(`span`, {innerText: tab}),

                    ],

                onclick: () => Tab.set(tab),

                })),

            }),

        ],

    });

module.exports = header;
