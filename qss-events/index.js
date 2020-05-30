"use strict";

const EventEmitter = require(`events`);

const events = new EventEmitter();

events.once(`folderIsReady`, () => process.nextTick(() => {

    events.emit(`maintenance`);

    events.emit(`setupIsComplete`);

}));

let maintenanceTimeout;

const resetMaintenanceTimeout = () => {

    clearTimeout(maintenanceTimeout);

    maintenanceTimeout = setTimeout(

        () => events.emit(`maintenance`), 

        1000 * 60 * 60,

        );

};

events.on(`maintenance`, resetMaintenanceTimeout);

events.on(`usage`, resetMaintenanceTimeout);

module.exports = events;
