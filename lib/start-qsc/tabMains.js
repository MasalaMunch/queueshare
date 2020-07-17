"use strict";

const Elm = require(`../elm`);

const Tab = require(`./Tab.js`);

const tabMains = {};

const SomeLis = (tab) => {

    const someLis = [

        Elm(`li`, {

            innerText: `special ${tab} item`, 

            className: `special`

            }),

        ];

    someLis.push(...(new Array(20)).fill().map(() => {

        return Elm(`li`, {innerText: `normal ${tab} item`});

    }));

    return someLis;

};

for (const tab of Tab.all) {

    tabMains[tab] = Elm(`main`, {

        childNodes: [

            Elm(`ul`, {

                childNodes: [

                    Elm(`li`, {

                        innerText: `nested1`,

                        childNodes: [

                            Elm(`ul`, {

                                childNodes: SomeLis(tab).concat([

                                    Elm(`li`, {

                                        innerText: `nested2`,

                                        childNodes: [

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
