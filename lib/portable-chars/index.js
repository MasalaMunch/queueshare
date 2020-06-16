"use strict";

const portableChars = `ABDEFGHIJKLMNOQRSTVWXYZabdefghijklmnoqrstvwxyz0123456789-_!~'()`;

//^ https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent#Description
//  https://www.npmjs.com/package/sanitize-filename

module.exports = portableChars;
