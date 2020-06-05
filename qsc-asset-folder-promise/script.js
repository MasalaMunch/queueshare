"use strict";

const Elm = require(`../elm`);
const StoredJsonLog = require(`../stored-json-log`);

const p = Elm(`p`, {innerText: `hey ;)`, thisAintProper: `truuuuu`});

document.body.appendChild(p);

console.log(p.thisAintProper);

console.log(localStorage);

const testLog = new StoredJsonLog(`testLog/`);

console.log(testLog.Entries());

testLog.write([]);

console.log(testLog.Entries());

testLog.write([5,6,7]);

console.log(testLog.Entries());

testLog.eventuallyAppend(8);
