"use strict";

const assert = require(`assert`);

const Tab = {

    all: new Set([`queue`, `recents`, `playlists`, `uploads`, `settings`]),

    default: `queue`,

    Valid: (tab) => {

        assert(Tab.all.has(tab));

        return tab;

    },

    };

module.exports = Tab;
