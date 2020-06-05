"use strict";

const ViaFs = require(`./ViaFs.js`);
const ViaLocalStorage = require(`./ViaLocalStorage.js`);

const StoredJson = ViaFs.IsSupported()? ViaFs : ViaLocalStorage;

module.exports = StoredJson;
