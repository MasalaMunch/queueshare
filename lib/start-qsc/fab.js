"use strict";

const Elm = require(`../elm`);

const syncedState = require(`./syncedState.js`);

const fab = Elm(`div`, {

    className: `fab`, 

    childNodes: [Elm(`button`, {ariaLabel: `quick actions`, type: `button`})],

    onclick: () => syncedState.write({path: [], value: new Date()}),

    });

module.exports = fab;
