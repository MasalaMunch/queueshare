"use strict";

const Browserify = require(`browserify`);
const path = require(`path`);
const StreamAsStringPromise = require(`../stream-as-string-promise`);

const scriptFile = path.join(__dirname, `script.js`);

const JsPromise = () => StreamAsStringPromise(Browserify(scriptFile).bundle());

module.exports = JsPromise;
