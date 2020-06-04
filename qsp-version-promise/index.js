"use strict";

const JsonPromise = require(`../qsp-json-promise`);

const VersionPromise = async () => (await JsonPromise()).version;

module.exports = VersionPromise;
