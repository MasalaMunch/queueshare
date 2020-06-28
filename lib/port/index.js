"use strict";

const assert = require(`assert`);
const RandomInt = require(`../random-int`);

const minPort = 1024;

const maxPort = 49151;

//^ https://stackoverflow.com/a/113229

const Port = () => RandomInt(minPort, maxPort);

Port.Valid = (port) => {

    assert(Number.isInteger(port));

    assert(port >= minPort);

    assert(port <= maxPort);

    return port;

};

module.exports = Port;
