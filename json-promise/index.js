"use strict";

const JsonPromise = async (resource) => {

    const response = await fetch(resource);

    const json = await response.json();

    return json;

};

module.exports = JsonPromise;
