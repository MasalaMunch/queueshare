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

const lsOrderedTabs = new LsJson(

    `orderedTabs`, 

    Valid, 

    [`queue`, `recents`, `playlists`, `uploads`, `settings`],

    );

let orderedTabs = lsOrderedTabs.Value();

const OrderedTabs = () => orderedTabs;

OrderedTabs.events = new SafeEventEmitter();

lsOrderedTabs.events.on(`change`, (newOrderedTabs) => {

    orderedTabs = newOrderedTabs;

    OrderedTabs.events.emit(`change`, orderedTabs);

});

OrderedTabs.events.once(`hasStarted`, () => lsOrderedTabs.events.start());

OrderedTabs.set = (newOrderedTabs) => {

    orderedTabs = Valid(newOrderedTabs);

    lsOrderedTabs.write(orderedTabs);

};

module.exports = OrderedTabs;
