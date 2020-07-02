"use strict";

const clearElm = (elm) => {

    while (elm.lastChild !== null) {

        elm.removeChild(elm.lastChild);

    }

};

module.exports = clearElm;
