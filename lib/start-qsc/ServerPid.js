"use strict";

const Delay = require(`../delay`);
const EventEmitter = require(`events`);
const reliablyFetchJson = require(`../reliably-fetch-json`);

const serverApiPaths = require(`../qss-api-paths`);

let serverPid;

const ServerPid = () => serverPid;

ServerPid.events = new EventEmitter();

const startFetching = () => {

    reliablyFetchJson(serverApiPaths.pid, {timeout: Delay.oneSecond}).then(

        (currentServerPid) => {

            if (serverPid !== currentServerPid) {

                serverPid = currentServerPid;

                ServerPid.events.emit(`change`, serverPid);

            }

            startFetching();

        },

        );

};

startFetching();

module.exports = ServerPid;
