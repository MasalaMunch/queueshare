"use strict";

const Elm = require(`../elm`);

const Tab = require(`./Tab.js`);

const tabMains = {};

const SomeLis = (tab) => {

    const someLis = [

        Elm(`li`, {

            tabIndex: 0,

            childNodes: [

                Elm(`div`, {

                    className: `item`,

                    childNodes: [

                        Elm(`p`, {

                            classList: [`name`, `special`],

                            innerText: `special ${tab} item special ${tab} item special ${tab} item`,

                            }),

                        ],

                    }),

                ],

            }),

        ];

    someLis.push(...(new Array(20)).fill().map(() => {

        return Elm(`li`, {

            tabIndex: 0,

            childNodes: [

                Elm(`div`, {

                    className: `item`,

                    childNodes: [

                        Elm(`p`, {

                            className: `name`,

                            innerText: `normal ${tab} item`,

                            }),

                        ],

                    }),

                ],

            });

    }));

    return someLis;

};

for (const tab of Tab.all) {

    tabMains[tab] = Elm(`main`, {

        childNodes: [

            Elm(`ul`, {

                childNodes: [

                    Elm(`li`, {

                        tabIndex: 0,

                        childNodes: [

                            Elm(`div`, {

                                className: `item`,

                                childNodes: [

                                    Elm(`p`, {

                                        className: `name`,

                                        innerText: `nested1`,

                                        }),

                                    ],

                                }),

                            Elm(`ul`, {

                                childNodes: SomeLis(tab).concat([

                                    Elm(`li`, {

                                        tabIndex: 0,

                                        childNodes: [

                                            Elm(`div`, {

                                                className: `item`,

                                                childNodes: [

                                                    Elm(`p`, {

                                                        className: `name`,

                                                        innerText: `nested1`,

                                                        }),

                                                    ],

                                                }),

                                            Elm(`ul`, {

                                                childNodes: SomeLis(tab),
                                                
                                                }),

                                            ],

                                        }),

                                    ]),

                                }),

                            ],

                        }),

                    ].concat(SomeLis(tab)),

                }),

            ],

        });

}

module.exports = tabMains;
