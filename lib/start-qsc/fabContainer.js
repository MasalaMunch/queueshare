"use strict";

const Elm = require(`../elm`);

const syncedState = require(`./syncedState.js`);

const fabContainer = Elm(`div`, {
    
    id: `fabContainer`, 

    onclick: () => syncedState.write({path: [], value: new Date()}),

    childNodes: [Elm(`button`, {

        ariaLabel: `quick actions`, 

        id: `fab`, 

        type: `button`,

        })],

    });

module.exports = fabContainer;
