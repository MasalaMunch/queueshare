"use strict";

const portableChars = require(`../portable-chars`);
const UuidTranslator = require(`short-uuid`);

const portableUuidTranslator = UuidTranslator(portableChars);

const PortableUuid = () => portableUuidTranslator.new();

module.exports = PortableUuid;
