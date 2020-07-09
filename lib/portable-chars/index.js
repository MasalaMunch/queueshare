"use strict";

const portableChars = `ABDEFGHIJKLMNOQRSTVWXYZabdefghijklmnoqrstvwxyz0123456789-_!~()`;

//^ https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent#Description
//  https://www.npmjs.com/package/sanitize-filename
//  https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html#rule-1-html-escape-before-inserting-untrusted-data-into-html-element-content

module.exports = portableChars;
