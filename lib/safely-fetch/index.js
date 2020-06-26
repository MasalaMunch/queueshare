"use strict";

const ResponseError = require(`../response-error`);

const safelyFetch = async (...fetchArgs) => {

    const response = await fetch(...fetchArgs);

    if (response.ok) {

        return response;

    }

    throw new ResponseError(response);

};

module.exports = safelyFetch;
