"use strict";

const assert = require(`assert`);
const SafeEventEmitter = require(`../safe-event-emitter`);

const orderedTabs = require(`./orderedTabs.js`);

let tab = `queue`;

const Tab = () => tab;

Tab.events = new SafeEventEmitter();

const emitChange = () => Tab.events.emit(`change`, tab);

Tab.events.once(`hasStarted`, emitChange);

const validTabs = new Set(orderedTabs);

const Valid = (tab) => {

    assert(validTabs.has(tab));

    return tab;

};

Tab.set = (newTab) => {

    tab = Valid(newTab);

    if (Tab.events.hasStarted) {

        emitChange();

    }

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
