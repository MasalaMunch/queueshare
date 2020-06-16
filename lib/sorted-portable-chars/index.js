"use strict";

const portableChars = require(`../portable-chars`);

let sortedPortableChars = portableChars.split(``);

sortedPortableChars.sort();

sortedPortableChars = sortedPortableChars.join(``);

module.exports = sortedPortableChars;
