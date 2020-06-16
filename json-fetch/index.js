"use strict";

const JsonFetch = async (resource) => {

    const response = await fetch(resource);

    if (response.status >= 400) {

        throw response;

    }

    const json = await response.json();

    return json;

};

module.exports = JsonFetch;
