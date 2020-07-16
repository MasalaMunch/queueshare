"use strict";

const assert = require(`assert`);

const Tab = {

    all: new Set([

        `favorites`, 

        `playlists`, 

        `queue`, 

        `recents`, 

        `settings`, 

        `uploads`,

        ]),

    Valid (tab) {

        assert(this.all.has(tab));

        return tab;

    },

    };

module.exports = Tab;
