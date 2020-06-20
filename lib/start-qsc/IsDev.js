"use strict";

const JsonFetch = require(`../json-fetch`);

const networkErrorDelay = require(`./networkErrorDelay.js`);
const serverApiPaths = require(`../qss-api-paths`);

let isDev = false;

const IsDev = () => isDev;

const eventuallyFetchIsDev = () => {

    (async () => {

        try {

            isDev = await JsonFetch(serverApiPaths.isDev);

        } catch (error) {

            console.error(error);

            setTimeout(eventuallyFetchIsDev, networkErrorDelay);

            return;

        }

    })();

};

eventuallyFetchIsDev();

module.exports = IsDev;
