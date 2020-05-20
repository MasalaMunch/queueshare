"use strict";

const EventEmitter = require(`events`);

const qssEvents = new EventEmitter();

const emitMaintenance = () => qssEvents.emit(`maintenance`);

qssEvents.on(`folderLockAcquisition`, () => process.nextTick(emitMaintenance));

let maintenanceTimeout;

const resetMaintenanceTimeout = () => {

    clearTimeout(maintenanceTimeout);

    maintenanceTimeout = setTimeout(emitMaintenance, 1000 * 60 * 60);

};

qssEvents.on(`maintenance`, resetMaintenanceTimeout);

qssEvents.on(`usage`, resetMaintenanceTimeout);

module.exports = qssEvents;
