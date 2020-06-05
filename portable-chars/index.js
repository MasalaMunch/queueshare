"use strict";

const portableChars = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_!~'()`;

//^ see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent#Description
//  and https://www.npmjs.com/package/sanitize-filename

module.exports = portableChars;
