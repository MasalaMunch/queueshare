"use strict";

const IsDev = require(`./IsDev.js`);

const logNetworkError = (networkError) => {

    if (IsDev()) {

        console.error(networkError);

    }

};

module.exports = logNetworkError;
