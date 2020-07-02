"use strict";

const assert = require(`assert`);
const EventEmitter = require(`events`);

const orderedTabs = require(`./orderedTabs.js`);

let tab;

const Tab = () => tab;

Tab.Valid = (tab) => {

    assert(orderedTabs.includes(tab));

    return tab;

};

Tab.events = new EventEmitter();

Tab.set = (newTab) => {

    newTab = Tab.Valid(newTab);

    if (tab !== newTab) {

        tab = newTab;

        Tab.events.emit(`change`, tab);

    }

};

process.nextTick(() => Tab.set(`queue`));

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

module.exports = Tab;
