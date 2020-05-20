"use strict";

const UrlEncodedUuid = require(`../url-encoded-uuid`);
const UuPathId = require(`../uu-path-id`);

const Id = (dataPaths) => UrlEncodedUuid(UuPathId(dataPaths.id));

module.exports = Id;
