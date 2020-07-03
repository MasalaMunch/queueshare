"use strict";

const Elm = require(`../elm`);

const fab = Elm(`div`, {

    className: `fab`, 

    childNodes: [

        Elm(`button`, {type: `button`, ariaLabel: `quick actions`}),

        ],

    });

module.exports = fab;
