"use strict";

const Delay = require(`../delay`);
const reliablyFetchJson = require(`../reliably-fetch-json`);
const safelyFetchJson = require(`../safely-fetch-json`);

const eventuallyRestart = require(`./eventuallyRestart.js`);
const serverApiPaths = require(`../qss-api-paths`);

let serverPid;

const startVerifyingServerPid = () => {

    reliablyFetchJson(serverApiPaths.pid, {timeout: Delay.oneSecond}).then(

        (currentServerPid) => {

            if (serverPid === currentServerPid) {

                startVerifyingServerPid();

            }
            else {

                eventuallyRestart();

            }

        },

        );

};

const ServerPid = async () => {

    if (serverPid === undefined) {

        serverPid = await safelyFetchJson(serverApiPaths.pid);

        startVerifyingServerPid();

    }

    return serverPid;

};

module.exports = ServerPid;
