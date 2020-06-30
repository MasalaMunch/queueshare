"use strict";

const Elm = require(`../elm`);

const fab = Elm(`div`, {

    className: `fab`, 

    childNodes: [Elm(`button`, {aria: {label: `quick actions`}})],

    });

module.exports = fab;
