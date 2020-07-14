"use strict";

const LsJson = require(`../ls-json`);
const SafeEventEmitter = require(`../safe-event-emitter`);

const Tab = require(`./Tab.js`);

const lsInitialTab = new LsJson(`initialTab`, Tab.Valid, `queue`);

const InitialTab = () => lsInitialTab.Value();

InitialTab.events = new SafeEventEmitter();

lsInitialTab.events.on(`change`, () => {

    InitialTab.events.emit(`change`, InitialTab());

});

InitialTab.events.once(`hasStarted`, () => lsInitialTab.events.start());

InitialTab.set = (initialTab) => {

    lsInitialTab.write(initialTab);

};

module.exports = InitialTab;
