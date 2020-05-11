"use strict";

const path = require(`path`);

const names = [
    
    `deviceId`, 

    `lock`, 

    `syncedState`,

    ];

module.exports = (dir) => {

    return Object.fromEntries(names.map((n) => [n, path.join(dir, n)]));

};
