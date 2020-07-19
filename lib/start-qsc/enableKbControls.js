"use strict";

const assert = require(`assert`);
const Elm = require(`../elm`);

const CurrentTab = require(`./CurrentTab.js`);
const KbFocus = require(`./KbFocus.js`);
const tabCachedKbFocuses = require(`./tabCachedKbFocuses.js`);

let hasEnabledKbControls = false;

const enableKbControls = () => {

    assert(!hasEnabledKbControls);

    Elm.on(document, `keydown`, (e) => {

        if (e.key === `Tab`) {

            e.preventDefault();

            const tab = e.shiftKey? CurrentTab.Previous() : CurrentTab.Next();

            CurrentTab.set(tab);

            KbFocus.set(tabCachedKbFocuses[tab]);

        }
        else if (e.key === `ArrowUp`) {

            e.preventDefault();

            KbFocus.set(KbFocus.Previous());

        }
        else if (e.key === `ArrowDown`) {

            e.preventDefault();

            KbFocus.set(KbFocus.Next());

        }

    });

    hasEnabledKbControls = true;

};

module.exports = enableKbControls;
