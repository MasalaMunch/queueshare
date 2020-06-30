"use strict";

const assert = require(`assert`);
const EventEmitter = require(`events`);
const LsJson = require(`../ls-json`);

const orderedTabs = require(`./orderedTabs.js`);
const syncedState = require(`./syncedState.js`);

const lsTab = new LsJson(`tab`);

let tab;

const Tab = () => tab;

Tab.Valid = (tab) => {

    assert(orderedTabs.includes(tab));

    return tab;

};

Tab.events = new EventEmitter();

const updateTab = () => {

    if (syncedState.gotInitialChanges) {

        let newTab;

        try {

            newTab = Tab.Valid(lsTab.Value());

        } catch (error) {

            newTab = `queue`;

        }

        if (tab !== newTab) {

            tab = newTab;

            Tab.events.emit(`change`, tab);

        }

    }

};

syncedState.events.once(`gotInitialChanges`, updateTab);

lsTab.events.on(`change`, updateTab);

Tab.set = (newTab) => lsTab.write(Tab.Valid(newTab));

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
