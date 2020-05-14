"use strict";

const mediaKeyRoute = `/media/:key`;

const routes = {

    id: `/id`,

    ipAddress: `/ipAddress`,

    mediaFile: `${mediaKeyRoute}/file`,

    mediaUrl: `${mediaKeyRoute}/url`,

    processId: `/processId`,

    syncedStateChanges: `/syncedState/changes`,

    ui: ``,

    };

module.exports = routes;
