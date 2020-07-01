"use strict";

const portableChars = require(`../portable-chars`);
const UuidTranslator = require(`short-uuid`);

const PortableUuid = () => UuidTranslator(portableChars).new();

module.exports = PortableUuid;
