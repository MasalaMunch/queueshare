"use strict";

const Browserify = require(`browserify`);
const path = require(`path`);
const StreamedStringPromise = require(`../streamed-string-promise`);

const scriptFile = path.join(__dirname, `script.js`);

const JsPromise = () => StreamedStringPromise(Browserify(scriptFile).bundle());

module.exports = JsPromise;
