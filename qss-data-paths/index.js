"use strict";

const Obj = require(`../obj`);
const path = require(`path`);

const QssDataPaths = (folder) => {

    const relativePaths = {

        id: `id`,

        media: `media`,

        port: `port`,

        syncedState: `syncedState`,

        };

    Obj.transform(relativePaths, (rp) => path.join(folder, rp));

    return relativePaths;

};

module.exports = QssDataPaths;
