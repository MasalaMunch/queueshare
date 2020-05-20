"use strict";

const Obj = require(`../obj`);

let isEnabled = true;

const logToQss = (...things) => {

    if (isEnabled) {

        console.log(...things);

        console.log();

    }

};

Obj.add(logToQss, {

    disable: () => isEnabled = false,

    });

module.exports = logToQss;
