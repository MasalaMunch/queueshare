"use strict";

const Delay = require(`../delay`);

const wait = (delay) => new Promise((resolve) => {

    setTimeout(resolve, Delay.Valid(delay));

});

module.exports = wait;
