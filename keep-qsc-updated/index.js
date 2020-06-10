"use strict";

const Interval = require(`../interval`);
const JsonFetch = require(`../json-fetch`);

const changeDelay = require(`../qsc-change-delay`);
const IsDev = require(`../qsc-is-dev`);
const serverApiPaths = require(`../qss-api-paths`);

const keepUpdated = async () => {

    let initialServerPid;

    Interval.set(async () => {

        let serverPid;

        try {

            serverPid = await JsonFetch(serverApiPaths.pid);

        } catch (error) {

            if (IsDev()) {

                console.error(error);

            }

            return;

        }

        if (initialServerPid === undefined) {

            initialServerPid = serverPid;

        }
        else if (initialServerPid !== serverPid) {

            window.location.reload();

        }

    }, changeDelay);

};

module.exports = keepUpdated;
