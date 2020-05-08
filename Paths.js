"use strict";

const Path = require(`path`);
const transform = require(`transform`);

module.exports = (dir) => {

    const paths = {

        deviceIdFile: `deviceId`,

        lockFile: `lock`,

        syncedStateFile: `syncedState`,

        };

    transform(paths, (relPath) => Path.join(dir, relPath));

    return paths;

};
