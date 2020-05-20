"use strict";

const EventEmitter = require(`events`);

const qssEvents = new EventEmitter();

qssEvents.on(`folderLockAcquisition`, () => process.nextTick(() => {

    qssEvents.emit(`maintenance`);

    qssEvents.emit(`setupCompletion`);

}));

let maintenanceTimeout;

const resetMaintenanceTimeout = () => {

    clearTimeout(maintenanceTimeout);

    maintenanceTimeout = setTimeout(

        () => qssEvents.emit(`maintenance`), 

        1000 * 60 * 60,

        );

};

qssEvents.on(`maintenance`, resetMaintenanceTimeout);

qssEvents.on(`usage`, resetMaintenanceTimeout);

module.exports = qssEvents;
