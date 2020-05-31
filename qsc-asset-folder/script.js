"use strict";

const Dom = require(`../dom`);

const p = Dom(`p`, {innerText: `hey ;)`, thisAintProper: true});

document.body.appendChild(p);

console.log(p.thisAintProper);
