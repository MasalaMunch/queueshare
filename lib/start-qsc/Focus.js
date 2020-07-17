"use strict";

const Focus = () => {

    const {activeElement} = document;

    return activeElement === null? Focus.default : activeElement;

};

Focus.default = document.body;

module.exports = Focus;
