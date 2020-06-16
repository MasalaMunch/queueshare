"use strict";

const PortableUuid = require(`../portable-uuid`);
const uuid = require(`uuid`);

const pid = PortableUuid(uuid.v4());

module.exports = pid;
