"use strict";

const assert = require(`assert`);
const EventEmitter = require(`events`);

const orderedTabs = require(`./orderedTabs.js`);

let tab = `queue`;

const CurrentTab = () => tab;

CurrentTab.events = new EventEmitter();

const emitChange = () => CurrentTab.events.emit(`change`, tab);

let hasStartedEmitting = false;

CurrentTab.startEmitting = () => {

    assert(!hasStartedEmitting);

    hasStartedEmitting = true;

    emitChange();

};

const validTabs = new Set(orderedTabs);

const Valid = (tab) => {

    assert(validTabs.has(tab));

    return tab;

};

CurrentTab.set = (newTab) => {

    tab = Valid(newTab);

    if (hasStartedEmitting) {

        emitChange();

    }

};

CurrentTab.Previous = () => {

    const index = orderedTabs.indexOf(tab);

    return orderedTabs[(index === 0)? orderedTabs.length-1 : index-1];

};

CurrentTab.Next = () => {

    const index = orderedTabs.indexOf(tab);

    return orderedTabs[(index === orderedTabs.length-1)? 0 : index+1];

};

CurrentTab.IsFirst = () => orderedTabs.indexOf(tab) === 0;

CurrentTab.IsLast = () => orderedTabs.indexOf(tab) === orderedTabs.length-1;

module.exports = CurrentTab;
