"use strict";

const assert = require(`assert`);
const EventEmitter = require(`events`);

const orderedTabs = require(`./orderedTabs.js`);
const syncedState = require(`./syncedState.js`);

let tab;

const Tab = () => tab;

Tab.Valid = (tab) => {

    assert(orderedTabs.includes(tab));

    return tab;

};

Tab.Next = () => {

    const index = orderedTabs.indexOf(tab);

    return (

        index === -1?

        undefined : orderedTabs[(index === orderedTabs.length-1)? 0 : index+1]

        );

};

Tab.Previous = () => {

    const index = orderedTabs.indexOf(tab);

    return (

        index === -1?

        undefined : orderedTabs[(index === 0)? orderedTabs.length-1 : index-1]

        );

};

Tab.IsFirst = () => orderedTabs.indexOf(tab) === 0;

Tab.IsLast = () => orderedTabs.indexOf(tab) === orderedTabs.length-1;

Tab.events = new EventEmitter();

let intendedTab = `queue`;

const updateTab = () => {

    if (syncedState.gotInitialChanges) {

        if (tab !== intendedTab) {

            tab = intendedTab;

            Tab.events.emit(`change`, tab);

        }

    }

};

syncedState.events.once(`gotInitialChanges`, updateTab);

Tab.set = (tab) => {

    intendedTab = Tab.Valid(tab);

    updateTab();

};

module.exports = Tab;
