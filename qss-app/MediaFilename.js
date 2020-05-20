"use strict";

const assert = require(`assert`);
const SanitizedFilename = require(`sanitize-filename`);

const MediaFilename = (key) => {

    assert(key === SanitizedFilename(key));

    return key;

};

module.exports = MediaFilename;
