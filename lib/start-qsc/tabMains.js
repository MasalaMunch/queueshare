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

                        childNodes: [

                            Elm(`button`, {

                                className: `twistie icon`,

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

                                className: `name`,

                                childNodes: [

                                    Elm(`div`, {

                                        innerText: `Name special name special name special name special name special name special name special name special name special name special name special`,

                                        }),

                                    ],
                                
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

                                        className: `twistie icon`,

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

                                        className: `name`,

                                        innerText: `Name`,

                                        }),

                                    ],

                                }),

                            Elm(`details`, {

                                open: true,

                                childNodes: [

                                    Elm(`summary`, {

                                        childNodes: [

                                            Elm(`button`, {

                                                className: `twistie icon`,

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

                                                className: `name`,

                                                innerText: `Name`,

                                                }),

                                            ],

                                        }),

                                    ],

                                }),

                            ],

                        }),

                    Elm(`details`, {

                        open: true,

                        childNodes: [

                            Elm(`summary`, {

                                childNodes: [

                                    Elm(`button`, {

                                        className: `twistie icon`,

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

                                        className: `name`,

                                        innerText: `Name`,

                                        }),

                                    ],

                                }),

                            Elm(`details`, {

                                open: true,

                                childNodes: [

                                    Elm(`summary`, {

                                        childNodes: [

                                            Elm(`button`, {

                                                className: `twistie icon`,

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

                                                className: `name`,

                                                innerText: `Name`,

                                                }),

                                            ],

                                        }),

                                    ],

                                }),

                            ],

                        }),

                    ],

                }),

            Elm(`details`, {

                open: true,

                childNodes: [

                    Elm(`summary`, {

                        childNodes: [


                            Elm(`button`, {

                                className: `twistie icon`,

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

                                className: `name`,

                                innerText: `Name name name name name name name name name name name`,

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

                                        className: `twistie icon`,

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

                                        className: `name`,

                                        innerText: `Name`,

                                        }),

                                    ],

                                }),

                            Elm(`details`, {

                                open: true,

                                childNodes: [

                                    Elm(`summary`, {

                                        childNodes: [

                                            Elm(`button`, {

                                                className: `twistie icon`,

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

                                                className: `name`,

                                                innerText: `Name`,

                                                }),

                                            ],

                                        }),

                                    ],

                                }),

                            ],

                        }),

                    Elm(`details`, {

                        open: true,

                        childNodes: [

                            Elm(`summary`, {

                                childNodes: [

                                    Elm(`button`, {

                                        className: `twistie icon`,

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

                                        className: `name`,

                                        innerText: `Name`,

                                        }),

                                    ],

                                }),

                            Elm(`details`, {

                                open: true,

                                childNodes: [

                                    Elm(`summary`, {

                                        childNodes: [

                                            Elm(`button`, {

                                                className: `twistie icon`,

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

                                                className: `name`,

                                                innerText: `Name`,

                                                }),

                                            ],

                                        }),

                                    ],

                                }),

                            ],

                        }),

                    ],

                }),

            Elm(`details`, {

                open: true,

                childNodes: [

                    Elm(`summary`, {

                        childNodes: [


                            Elm(`button`, {

                                className: `twistie icon`,

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

                                className: `name`,

                                innerText: `Name name name name name name name name name name name`,

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

                                        className: `twistie icon`,

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

                                        className: `name`,

                                        innerText: `Name`,

                                        }),

                                    ],

                                }),

                            Elm(`details`, {

                                open: true,

                                childNodes: [

                                    Elm(`summary`, {

                                        childNodes: [

                                            Elm(`button`, {

                                                className: `twistie icon`,

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

                                                className: `name`,

                                                innerText: `Name`,

                                                }),

                                            ],

                                        }),

                                    ],

                                }),

                            ],

                        }),

                    Elm(`details`, {

                        open: true,

                        childNodes: [

                            Elm(`summary`, {

                                childNodes: [

                                    Elm(`button`, {

                                        className: `twistie icon`,

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

                                        className: `name`,

                                        innerText: `Name`,

                                        }),

                                    ],

                                }),

                            Elm(`details`, {

                                open: true,

                                childNodes: [

                                    Elm(`summary`, {

                                        childNodes: [

                                            Elm(`button`, {

                                                className: `twistie icon`,

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

                                                className: `name`,

                                                innerText: `Name`,

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
