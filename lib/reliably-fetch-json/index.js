"use strict";

const reliablyFetch = require(`../reliably-fetch`);

const reliablyFetchJson = async (...reliablyFetchArgs) => {

    const response = await reliablyFetch(...reliablyFetchArgs);

    const json = await response.json();

    return json;

};

module.exports = reliablyFetchJson;
