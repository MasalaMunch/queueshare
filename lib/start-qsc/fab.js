"use strict";

const Elm = require(`../elm`);

const syncedState = require(`./syncedState.js`);

const fab = Elm(`div`, {

    className: `fab`, 

    childNodes: [Elm(`button`, {ariaLabel: `quick actions`})],

    onclick: () => syncedState.write({path: [], value: new Date()}),

    });

module.exports = fab;
