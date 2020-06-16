"use strict";

const Interval = require(`../interval`);
const JsonFetch = require(`../json-fetch`);

const networkErrorDelay = require(`./networkErrorDelay.js`);
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

}, networkErrorDelay, true);

const IsDev = () => isDev;

module.exports = IsDev;
