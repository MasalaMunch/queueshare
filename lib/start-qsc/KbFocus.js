"use strict";

const Elm = require(`../elm`);

const KbFocus = () => {

    const {activeElement} = document;

    return activeElement === null? KbFocus.default : activeElement;

};

KbFocus.default = document.body;

KbFocus.set = (elm) => {

    elm.classList.add(`kb-focus`);

    elm.focus();

    Elm.on(elm, `blur`, () => elm.classList.remove(`kb-focus`), {once: true});

};

module.exports = KbFocus;
