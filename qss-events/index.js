"use strict";

const EventEmitter = require(`events`);

const events = new EventEmitter();

events.on(`folderLockAcquisition`, () => process.nextTick(() => {

    events.emit(`maintenance`);

    events.emit(`setupCompletion`);

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
