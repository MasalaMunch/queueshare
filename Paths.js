"use strict";

const path = require(`path`);
const transform = require(`transform`);

module.exports = (dir) => {

    const paths = {

        deviceIdFile: `deviceId`,

        lockFile: `lock`,

        syncedStateFile: `syncedState`,

        };

    transform(paths, (relPath) => path.join(dir, relPath));

    return paths;

};
