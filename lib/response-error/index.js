"use strict";

const ResponseError = class extends Error {

    constructor (response) {

        super(response.statusText);

        this.response = response;

    }

    };

module.exports = ResponseError;
