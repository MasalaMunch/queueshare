"use strict";

const EscapedForRegex = (string) => {

  return string.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&');

};

//^ https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#Escaping

module.exports = EscapedForRegex;
