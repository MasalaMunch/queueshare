"use strict";

const Elm = require(`../elm`);

const Tab = require(`./Tab.js`);

const tabMains = {};

for (const tab of Tab.all) {

    tabMains[tab] = Elm(`main`, {

        childNodes: [

            Elm(`details`, {

                open: true,

                childNodes: [

                    Elm(`summary`, {

                        onclick: (e) => e.preventDefault(),

                        childNodes: [

                            Elm(`button`, {

                                className: `child-toggle icon`,

                                onclick () {

                                    const details = (

                                        this.parentElement.parentElement

                                        );

                                    details.open = !details.open;

                                    //TODO also use aria-expanded

                                    // https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/button_role

                                },

                                childNodes: [



                                    ],

                                }),

                            Elm(`button`, {

                                className: `name special`,

                                innerText: `name special name special name special name special name special name special name special name special name special name special name special`,

                                //TODO add aria-haspopup https://www.accessibility-developer-guide.com/examples/sensible-aria-usage/expanded/#adding-haspopup-optional

                                }),

                            ],

                        }),

                    Elm(`details`, {

                        open: true,

                        childNodes: [

                            Elm(`summary`, {

                                childNodes: [

                                    Elm(`button`, {

                                        className: `name`,

                                        innerText: `name`,

                                        }),

                                    ],

                                }),

                            Elm(`details`, {

                                open: true,

                                childNodes: [

                                    Elm(`summary`, {

                                        childNodes: [

                                            Elm(`button`, {

                                                className: `name`,

                                                innerText: `name`,

                                                }),

                                            ],

                                        }),

                                    ],

                                }),

                            ],

                        }),

                    ],

                }),

            ],

        });

}

module.exports = tabMains;
