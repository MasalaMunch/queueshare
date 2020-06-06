"use strict";

const RandomInt = require(`random-int`);

const RandomPort = () => RandomInt(1024, 49151); // https://stackoverflow.com/a/113229

module.exports = RandomPort;
