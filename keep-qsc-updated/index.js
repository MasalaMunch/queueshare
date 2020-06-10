"use strict";

const Interval = require(`../interval`);
const JsonFetch = require(`../json-fetch`);

const changeDelay = require(`../qsc-change-delay`);
const serverApiPaths = require(`../qss-api-paths`);

const ServerPidPromise = () => JsonFetch(serverApiPaths.pid);

const keepUpdated = async () => {

    const initialServerPid = await ServerPidPromise();

    Interval.set(async () => {

        const currentServerPid = await ServerPidPromise();

        if (initialServerPid !== currentServerPid) {

            window.location.reload();

        }

    }, changeDelay);

};

module.exports = keepUpdated;
