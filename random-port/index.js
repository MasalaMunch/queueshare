"use strict";

const RandomInt = require(`random-int`);

const portRange = [1024, 49151] // see https://stackoverflow.com/a/113229

const RandomPort = () => RandomInt(...portRange);

module.exports = RandomPort;
