"use strict";

const UrlEncodedUuid = require(`../url-encoded-uuid`);
const UuProcessId = require(`../uu-process-id`);

const processId = UrlEncodedUuid(UuProcessId());

module.exports = processId;
