"use strict";

const Delay = require(`../delay`);
const EventEmitter = require(`events`);
const reliablyFetchJson = require(`../reliably-fetch-json`);

let serverPid;

const ServerPid = () => serverPid;

ServerPid.events = new EventEmitter();

const startFetching = () => {

    reliablyFetchJson(`/pid`, {timeout: Delay.oneSecond}).then(

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
