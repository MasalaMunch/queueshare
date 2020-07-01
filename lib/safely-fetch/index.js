"use strict";

const ResponseError = class extends Error {

    constructor (response) {

        super(response.statusText);

        this.response = response;

    }

    };

const safelyFetch = async (...fetchArgs) => {

    const response = await fetch(...fetchArgs);

    if (response.ok) {

        return response;

    }

    throw new ResponseError(response);

};

safelyFetch.ResponseError = ResponseError;

module.exports = safelyFetch;
