"use strict";

const Interval = require(`../interval`);
const JsonFetch = require(`../json-fetch`);

const changeDelay = require(`./changeDelay.js`);
const serverApiPaths = require(`../qss-api-paths`);

let isDev = false;

const fetchInterval = Interval.set(async () => {

    try {

        isDev = await JsonFetch(serverApiPaths.isDev);

    } catch (error) {

        if (IsDev()) {

            console.error(error);

        }

        return;

    }

    fetchInterval.destroy();

}, changeDelay, true);

const IsDev = () => isDev;

module.exports = IsDev;
