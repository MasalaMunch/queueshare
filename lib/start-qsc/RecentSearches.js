"use strict";

const assert = require(`assert`);
const LsJson = require(`../ls-json`);

const Valid = (search) => {

    assert(typeof search === `string`);

    assert(search.length > 0);

    return search;

};

const maxCount = 14;

const lsRecentSearches = new LsJson(`recentSearches`, (recentSearches) => {

    assert(Array.isArray(recentSearches));

    assert(recentSearches.length <= maxCount);

    assert(recentSearches.length === (new Set(recentSearches)).size);

    return recentSearches.map(Valid);

}, []);

const RecentSearches = () => lsRecentSearches.Value();

RecentSearches.add = (search) => {

    const recentSearches = RecentSearches();

    search = Valid(search);

    if (!recentSearches.includes(search)) {

        lsRecentSearches.write(

            [search].concat(recentSearches).slice(0, maxCount)

            );

    }

};

module.exports = RecentSearches;
