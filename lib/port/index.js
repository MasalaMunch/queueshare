"use strict";

const assert = require(`assert`);
const RandomInt = require(`../random-int`);

const portRange = [1024, 49151]; // https://stackoverflow.com/a/113229

const Port = () => RandomInt(...portRange);

Port.Valid = (port) => {

    assert(Number.isInteger(port));

    assert(port >= portRange[0]);

    assert(port <= portRange[1]);

    return port;

};

module.exports = Port;
