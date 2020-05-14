"use strict";

const Obj = require(`../obj`);
const path = require(`path`);

const Paths = (folder) => {

    const relativePaths = {

        id: `id`,

        port: `port`,

        syncedState: `syncedState`,

        };

    Obj.transform(relativePaths, (rp) => path.join(folder, rp));

    return relativePaths;

};

module.exports = Paths;
