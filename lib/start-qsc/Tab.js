"use strict";

const assert = require(`assert`);
const EventEmitter = require(`events`);

const orderedTabs = require(`./orderedTabs.js`);

let hasStartedChanging = false;

let tab = `queue`;

const Tab = () => tab;

Tab.events = new EventEmitter();

const emitChange = () => Tab.events.emit(`change`, tab);

Tab.startChanging = () => {

    assert(!hasStartedChanging);

    hasStartedChanging = true;

    emitChange();

};

const validTabs = new Set(orderedTabs);

const Valid = (tab) => {

    assert(validTabs.has(tab));

    return tab;

};

Tab.set = (newTab) => {

    assert(hasStartedChanging);

    tab = Valid(newTab);

    emitChange();

};

Tab.Previous = () => {

    const index = orderedTabs.indexOf(tab);

    return orderedTabs[(index === 0)? orderedTabs.length-1 : index-1];

};

Tab.Next = () => {

    const index = orderedTabs.indexOf(tab);

    return orderedTabs[(index === orderedTabs.length-1)? 0 : index+1];

};

Tab.IsFirst = () => orderedTabs.indexOf(tab) === 0;

Tab.IsLast = () => orderedTabs.indexOf(tab) === orderedTabs.length-1;

module.exports = Tab;
