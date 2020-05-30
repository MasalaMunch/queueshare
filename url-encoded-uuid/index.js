"use strict";

const urlChars = require(`../url-chars`);
const UuidTranslator = require(`short-uuid`);

const uuidTranslator = UuidTranslator(urlChars);

const UrlEncodedUuid = (uuid) => uuidTranslator.fromUUID(uuid);

module.exports = UrlEncodedUuid;
