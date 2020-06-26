"use strict";

const safelyFetch = require(`../safely-fetch`);

const safelyFetchJson = async (...safelyFetchArgs) => {

    const response = await safelyFetch(...safelyFetchArgs);

    const json = await response.json();

    return json;

};

module.exports = safelyFetchJson;
