"use strict";

const assert = require(`assert`);

const Tab = {

    all: new Set([`playlists`, `queue`, `recents`, `settings`, `uploads`]),

    Valid: (tab) => {

        assert(Tab.all.has(tab));

        return tab;

    },

    };

module.exports = Tab;
