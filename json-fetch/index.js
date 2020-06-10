"use strict";

const JsonFetch = async (resource) => {

    const response = await fetch(resource);

    const json = await response.json();

    return json;

};

module.exports = JsonFetch;
