"use strict";

const UrlEncodedUuid = require(`../url-encoded-uuid`);
const uuid = require(`uuid`);

const pid = UrlEncodedUuid(uuid.v4());

module.exports = pid;
