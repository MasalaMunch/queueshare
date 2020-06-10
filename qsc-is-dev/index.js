"use strict";

const serverApiPaths = require(`../qss-api-paths`);
const JsonFetch = require(`../json-fetch`);

let isDev = false;

(async () => {

    isDev = await JsonFetch(serverApiPaths.isDev);

})();

const IsDev = () => isDev;

module.exports = IsDev;
