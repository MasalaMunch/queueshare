"use strict";

const Elm = require(`../elm`);

const Tab = require(`./Tab.js`);

const tabMains = {};

for (const tab of Tab.all) {

    tabMains[tab] = Elm(`main`, {

        childNodes: [

            Elm(`details`, {

                onclick: (e) => e.preventDefault(),

                childNodes: [

                    Elm(`summary`, {

                        onclick: (e) => e.preventDefault(),

                        childNodes: [

                            Elm(`button`, {

                                className: `twistie`,

                                onclick () {

                                    const details = (

                                        this.parentElement.parentElement

                                        );

                                    details.open = !details.open;

                                    //TODO also use aria-expanded

                                    // https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/button_role

                                },

                                childNodes: [

                                    Elm(`img`, {

                                        ariaHidden: true,

                                        className: `icon expand`,

                                        src: `/clientAssets/icons/plus.svg`,

                                        }),

                                    Elm(`img`, {

                                        ariaHidden: true,

                                        className: `icon collapse`,

                                        src: `/clientAssets/icons/minus.svg`,

                                        }),

                                    ],

                                }),

                            Elm(`button`, {

                                className: `name special`,

                                childNodes: [

                                    Elm(`div`, {

                                        innerText: `Name special name special name special name special name special name special name special name special name special name special name`,

                                        }),

                                    ],
                                
                                //TODO add aria-haspopup https://www.accessibility-developer-guide.com/examples/sensible-aria-usage/expanded/#adding-haspopup-optional

                                }),


                            Elm(`button`, {

                                className: `action`,

                                childNodes: [

                                    Elm(`img`, {

                                        ariaHidden: true,

                                        className: `icon`,

                                        src: `/clientAssets/icons/x.svg`,

                                        }),

                                    ],
                                
                                //TODO add aria-haspopup https://www.accessibility-developer-guide.com/examples/sensible-aria-usage/expanded/#adding-haspopup-optional

                                }),


                            Elm(`button`, {

                                className: `action`,

                                childNodes: [

                                    Elm(`img`, {

                                        ariaHidden: true,

                                        className: `icon`,

                                        src: `/clientAssets/icons/x.svg`,

                                        }),

                                    ],
                                
                                //TODO add aria-haspopup https://www.accessibility-developer-guide.com/examples/sensible-aria-usage/expanded/#adding-haspopup-optional

                                }),

                            ],

                        }),

                    ],

                }),

            Elm(`details`, {

                onclick: (e) => e.preventDefault(),

                childNodes: [

                    Elm(`summary`, {

                        onclick: (e) => e.preventDefault(),

                        childNodes: [

                            Elm(`button`, {

                                className: `twistie`,

                                onclick () {

                                    const details = (

                                        this.parentElement.parentElement

                                        );

                                    details.open = !details.open;

                                    //TODO also use aria-expanded

                                    // https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/button_role

                                },

                                childNodes: [

                                    Elm(`img`, {

                                        ariaHidden: true,

                                        className: `icon expand`,

                                        src: `/clientAssets/icons/plus.svg`,

                                        }),

                                    Elm(`img`, {

                                        ariaHidden: true,

                                        className: `icon collapse`,

                                        src: `/clientAssets/icons/minus.svg`,

                                        }),

                                    ],

                                }),

                            Elm(`button`, {

                                className: `name`,

                                childNodes: [

                                    Elm(`div`, {

                                        innerText: `Name name name name name name name name name name name`,

                                        }),

                                    ],
                                
                                //TODO add aria-haspopup https://www.accessibility-developer-guide.com/examples/sensible-aria-usage/expanded/#adding-haspopup-optional

                                }),


                            Elm(`button`, {

                                className: `action`,

                                childNodes: [

                                    Elm(`img`, {

                                        ariaHidden: true,

                                        className: `icon`,

                                        src: `/clientAssets/icons/x.svg`,

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

                                        className: `twistie`,

                                        onclick () {

                                            const details = (

                                                this.parentElement.parentElement

                                                );

                                            details.open = !details.open;

                                            //TODO also use aria-expanded

                                            // https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/button_role

                                        },

                                        childNodes: [

                                            Elm(`img`, {

                                                ariaHidden: true,

                                                className: `icon expand`,

                                                src: `/clientAssets/icons/plus.svg`,

                                                }),

                                            Elm(`img`, {

                                                ariaHidden: true,

                                                className: `icon collapse`,

                                                src: `/clientAssets/icons/minus.svg`,

                                                }),

                                            ],

                                        }),

                                    Elm(`button`, {

                                        className: `name`,

                                        childNodes: [

                                            Elm(`div`, {

                                                innerText: `Name name name name name name name name name name name`,

                                                }),

                                            ],
                                        
                                        //TODO add aria-haspopup https://www.accessibility-developer-guide.com/examples/sensible-aria-usage/expanded/#adding-haspopup-optional

                                        }),


                            Elm(`button`, {

                                className: `action`,

                                childNodes: [

                                    Elm(`img`, {

                                        ariaHidden: true,

                                        className: `icon`,

                                        src: `/clientAssets/icons/x.svg`,

                                        }),

                                    ],
                                
                                //TODO add aria-haspopup https://www.accessibility-developer-guide.com/examples/sensible-aria-usage/expanded/#adding-haspopup-optional

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
