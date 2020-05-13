"use strict";

const urlSafeChars = require(`../url-safe-chars`);
const UuidTranslator = require(`short-uuid`);

const uuidTranslator = UuidTranslator(urlSafeChars);

const UrlEncodedUuid = (uuid) => uuidTranslator.fromUUID(uuid);

module.exports = UrlEncodedUuid;
