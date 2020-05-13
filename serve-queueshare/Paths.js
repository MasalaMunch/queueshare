"use strict";

const Obj = require(`../obj`);
const path = require(`path`);

const Paths = (dir) => {

    const relPaths = {

        id: `id`,

        port: `port`,

        syncedState: `syncedState`,

        };

    Obj.transform(relPaths, (p) => path.join(dir, p));

    return relPaths;

};

module.exports = Paths;
