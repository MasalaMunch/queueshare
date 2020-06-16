"use strict";

const ViaFs = require(`./ViaFs.js`);
const ViaLs = require(`./ViaLs.js`);

const StoredJson = ViaFs.IsSupported()? ViaFs : ViaLs;

module.exports = StoredJson;
