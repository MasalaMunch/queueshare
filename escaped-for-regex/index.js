"use strict";

const EscapedForRegex = (string) => {

    return string.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&');

    //^ see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#Escaping

};

module.exports = EscapedForRegex;
