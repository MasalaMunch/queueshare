"use strict";

const assert = require(`assert`);
const SanitizedFilename = require(`sanitize-filename`);

const MediaKey = () => {

    throw new Error(`not implemented`);

};

MediaKey.Valid = (mediaKey) => {

    assert(mediaKey === SanitizedFilename(mediaKey));

    return mediaKey;

};

module.exports = MediaKey;
