"use strict";

const Browserify = require(`browserify`);
const path = require(`path`);
const StreamAsString = require(`../stream-as-string`);

const scriptFile = path.join(__dirname, `script.js`);

const Js = () => StreamAsString(Browserify(scriptFile).bundle());

module.exports = Js;
