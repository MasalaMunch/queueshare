"use strict";

const Obj = require(`../obj`);
const path = require(`path`);

module.exports = (dir) => {

    const relPaths = {

        id: `id`,

        port: `port`,

        syncedState: `syncedState`,

        };

    Obj.transform(relPaths, (p) => path.join(dir, p));

    return relPaths;

};
