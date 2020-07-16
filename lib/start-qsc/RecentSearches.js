"use strict";

const assert = require(`assert`);
const LsJson = require(`../ls-json`);

const maxRecentSearchCount = 14;

const lsRecentSearches = new LsJson(`recentSearches`, (recentSearches) => {

    assert(Array.isArray(recentSearches));

    assert(recentSearches.length <= maxRecentSearchCount);

    assert(recentSearches.length === (new Set(recentSearches)).size);

    for (const search of recentSearches) {

        assert(typeof search === `string`);

        assert(search.length > 0);

    }

    return recentSearches;

}, []);

const RecentSearches = () => lsRecentSearches.Value();

RecentSearches.add = (search) => {

    const recentSearches = RecentSearches();

    if (!recentSearches.includes(search)) {

        lsRecentSearches.write(

            [search].concat(recentSearches).slice(0, maxRecentSearchCount)

            );

    }

};

module.exports = RecentSearches;
