"use strict";

const SafeEventEmitter = require(`../safe-event-emitter`);

const InitialTab = require(`./InitialTab.js`);
const OrderedTabs = require(`./OrderedTabs.js`);
const Tab = require(`./Tab.js`);

let tab = InitialTab();

const CurrentTab = () => tab;

CurrentTab.events = new SafeEventEmitter();

const emitChange = (oldTab) => {

    CurrentTab.events.emit(`change`, tab, oldTab);

};

CurrentTab.events.once(`hasStarted`, () => emitChange(undefined));

CurrentTab.set = (newTab) => {

    const oldTab = tab;

    tab = Tab.Valid(newTab);

    if (CurrentTab.events.hasStarted) {

        emitChange(oldTab);

    }

};

CurrentTab.Previous = () => {

    const orderedTabs = OrderedTabs();

    const index = orderedTabs.indexOf(tab);

    return orderedTabs[(index === 0)? orderedTabs.length-1 : index-1];

};

CurrentTab.Next = () => {

    const orderedTabs = OrderedTabs();

    const index = orderedTabs.indexOf(tab);

    return orderedTabs[(index === orderedTabs.length-1)? 0 : index+1];

};

module.exports = CurrentTab;
