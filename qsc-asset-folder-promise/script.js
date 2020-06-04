"use strict";

const Elm = require(`../elm`);

const p = Elm(`p`, {innerText: `hey ;)`, thisAintProper: `truuuuu`});

document.body.appendChild(p);

console.log(p.thisAintProper);
