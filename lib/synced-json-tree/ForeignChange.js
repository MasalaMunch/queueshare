"use strict";

const assert = require(`assert`);

const LocalChange = require(`./LocalChange.js`);
const Version = require(`./Version.js`);

const ForeignChange = (localChange, versions) => ({...localChange, versions});

ForeignChange.Valid = (foreignChange) => {

    let {versions} = foreignChange;

    assert(Array.isArray(versions));

    assert(1+foreignChange.path.length === versions.length);

    versions = versions.map(Version.Valid);

    return ForeignChange(LocalChange.Valid(foreignChange), versions);

};

module.exports = ForeignChange;
