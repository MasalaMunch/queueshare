"use strict";

const Obj = require(`../obj`);
const path = require(`path`);

const Paths = (dir) => {

    const relativePaths = {

        id: `id`,

        port: `port`,

        syncedState: `syncedState`,

        };

    Obj.transform(relativePaths, (rp) => path.join(dir, rp));

    return relativePaths;

};

module.exports = Paths;
