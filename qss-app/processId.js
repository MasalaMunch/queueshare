"use strict";

const UrlEncodedUuid = require(`../url-encoded-uuid`);
const uuProcessId = require(`../uu-process-id`);

const processId = UrlEncodedUuid(uuProcessId);

module.exports = processId;
