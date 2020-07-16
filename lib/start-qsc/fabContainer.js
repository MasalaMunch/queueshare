"use strict";

const Elm = require(`../elm`);

const syncedState = require(`./syncedState.js`);

const fabContainer = Elm(`div`, {
    
    id: `fab-container`, 

    childNodes: [

        Elm(`button`, {

            ariaLabel: `Quick Actions`, 

            id: `fab`, 

            onclick: () => syncedState.write({path: [], value: new Date()}),

            type: `button`,

            }),

        ],

    });

module.exports = fabContainer;
