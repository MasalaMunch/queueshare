"use strict";

const assert = require(`assert`);
const LsJson = require(`../ls-json`);
const SafeEventEmitter = require(`../safe-event-emitter`);

const Tab = require(`./Tab.js`);

const Valid = (orderedTabs) => {

    assert(Array.isArray(orderedTabs));

    assert(orderedTabs.length === (new Set(orderedTabs)).size);

    assert(orderedTabs.length === Tab.all.size);

    return orderedTabs.map(Tab.Valid);

};

const defaultOrderedTabs = [...Tab.all];

let orderedTabs = defaultOrderedTabs;

const OrderedTabs = () => orderedTabs;

OrderedTabs.events = new SafeEventEmitter();

const lsOrderedTabs = new LsJson(`orderedTabs`);

lsOrderedTabs.events.on(`change`, (newOrderedTabs) => {

    try {

        orderedTabs = Valid(newOrderedTabs);

    } catch (error) {

        orderedTabs = defaultOrderedTabs;

    }

    OrderedTabs.events.emit(`change`, orderedTabs);

});

OrderedTabs.events.once(`hasStarted`, () => {

    lsOrderedTabs.events.start();

});

OrderedTabs.set = (newOrderedTabs) => {

    orderedTabs = Valid(newOrderedTabs);

    lsOrderedTabs.write(orderedTabs);

};

module.exports = OrderedTabs;
