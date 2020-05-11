"use strict";

const urlSafeChars = require(`../url-safe-chars`);
const UuidTranslator = require(`short-uuid`);

const uuidTranslator = UuidTranslator(urlSafeChars);

module.exports = (uuid) => uuidTranslator.fromUUID(uuid);
