"use strict";

const urlChars = require(`../url-chars`);

let sortedUrlChars = urlChars.split(``);

sortedUrlChars.sort();

sortedUrlChars = sortedUrlChars.join(``);

module.exports = sortedUrlChars;
