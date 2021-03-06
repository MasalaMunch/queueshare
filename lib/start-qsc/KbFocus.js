"use strict";

const Elm = require(`../elm`);

const CurrentTab = require(`./CurrentTab.js`);
const Tab = require(`./Tab.js`);

let kbFocus;

const KbFocus = () => kbFocus;

KbFocus.set = (newKbFocus) => {

    if (kbFocus !== undefined) {

        kbFocus.classList.remove(`kb-focus`);

        kbFocus.blur();

    }

    kbFocus = newKbFocus;

    if (kbFocus !== undefined) {

        kbFocus.classList.add(`kb-focus`);

        kbFocus.focus();

        //TODO make sure element is visible, scrolling to it if necessary
        //     (Elm.scrollTo method with input cushions?)

    }

};

Elm.on(window, `click`, () => KbFocus.set(undefined));

KbFocus.tabCaches = {};

for (const tab of Tab.all) {

    KbFocus.tabCaches[tab] = undefined;

}

CurrentTab.events.on(`change`, (newTab, oldTab) => {

    if (oldTab !== undefined) {

        KbFocus.tabCaches[oldTab] = kbFocus;

    }

    KbFocus.set(undefined);

});

//TODO oops, also include fab in KbFocus possibilities:

KbFocus.Previous = () => {

    let previousKbFocus;

    //TODO^ remove this initialization once other todos are done

    if (kbFocus === undefined) {

        // TODO if last list item exists, set it to that, else set to search input

    }
    else if (kbFocus !== `TODO_SEARCH_INPUT`) {

        //TODO if previous list item exists, set it to that, else set to search input

    }

    return previousKbFocus;

};

KbFocus.Next = () => {

    let nextKbFocus;

    //TODO^ remove this initialization once other todos are done

    if (kbFocus === undefined) {

        // nextKbFocus = TODO_SEARCH_INPUT;

    }
    else if (kbFocus === `TODO_SEARCH_INPUT`) {

        // TODO if first list item exists, set it to that, else set to undefined

    }
    else {

        //TODO if next list item exists, set it to that, else set to undefined

    }

    return nextKbFocus;

};

module.exports = KbFocus;
