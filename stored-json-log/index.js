"use strict";

const ViaFs = require(`./ViaFs.js`);
const ViaLocalStorage = require(`./ViaLocalStorage.js`);

const StoredJsonLog = ViaFs.IsSupported()? ViaFs : ViaLocalStorage;

module.exports = StoredJsonLog;
