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

    //TODO make sure element is visible, scrolling to it if necessary
    //     (Elm.scrollTo method with input cushions?)

    Elm.on(elm, `blur`, () => elm.classList.remove(`kb-focus`), {once: true});

};

//TODO oops, also include fab in KbFocus possibilities!

KbFocus.Previous = () => {

    const kbFocus = KbFocus();

    let previousKbFocus = KbFocus.default;

    //TODO^ remove this initialization once other todos are done

    if (kbFocus === KbFocus.default) {

        // TODO if last list item exists, set it to that, else set to search input

    }
    else if (kbFocus === `TODO_SEARCH_INPUT`) {

        previousKbFocus = KbFocus.default;

    }
    else {

        //TODO if previous list item exists, set it to that, else set to search input

    }

    return previousKbFocus;

};

KbFocus.Next = () => {

    const kbFocus = KbFocus();

    let nextKbFocus = KbFocus.default;

    //TODO^ remove this initialization once other todos are done

    if (kbFocus === KbFocus.default) {

        nextKbFocus = `TODO_SEARCH_INPUT`;

    }
    else if (kbFocus === `TODO_SEARCH_INPUT`) {

        // TODO if first list item exists, set it to that, else set to KbFocus.default

    }
    else {

        //TODO if next list item exists, set it to that, else set to KbFocus.default

    }

    return nextKbFocus;

};

module.exports = KbFocus;
