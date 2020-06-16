"use strict";

const portableChars = require(`../portable-chars`);
const UuidTranslator = require(`short-uuid`);

const uuidTranslator = UuidTranslator(portableChars);

const PortableUuid = (uuid) => uuidTranslator.fromUUID(uuid);

module.exports = PortableUuid;
