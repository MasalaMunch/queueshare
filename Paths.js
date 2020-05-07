"use strict";

const Path = require(`path`);
const ShallowCopy = require(`shallow-copy`);
const transform = require(`transform`);

const relPaths = {

    deviceIdFile: `deviceId`,

    lockFile: `lock`,

    syncedStateFile: `syncedState`,

    };

module.exports = (dir) => {

    const paths = ShallowCopy(relPaths);

    transform(paths, (relPath) => Path.join(dir, relPath));

    return paths;

};
