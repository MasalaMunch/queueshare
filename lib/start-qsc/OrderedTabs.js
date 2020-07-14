"use strict";

const assert = require(`assert`);
const LsJson = require(`../ls-json`);
const SafeEventEmitter = require(`../safe-event-emitter`);

const Tab = require(`./Tab.js`);

const lsOrderedTabs = new LsJson(`orderedTabs`, (orderedTabs) => {

    assert(Array.isArray(orderedTabs));

    assert(orderedTabs.length === (new Set(orderedTabs)).size);

    assert(orderedTabs.length === Tab.all.size);

    return orderedTabs.map(Tab.Valid);

}, [...Tab.all]);

const OrderedTabs = () => lsOrderedTabs.Value();

OrderedTabs.events = new SafeEventEmitter();

lsOrderedTabs.events.on(`change`, () => {

    OrderedTabs.events.emit(`change`, OrderedTabs());

});

OrderedTabs.events.once(`hasStarted`, () => lsOrderedTabs.events.start());

OrderedTabs.set = (orderedTabs) => {

    lsOrderedTabs.write(orderedTabs);

};

module.exports = OrderedTabs;
