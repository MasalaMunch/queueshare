"use strict";

const assert = require(`assert`);
const AsJsonWithSortedKeys = require(`./AsJsonWithSortedKeys.js`);
const FromJson = require(`./FromJson.js`);
const SyncedStringTree = require(`./SyncedStringTree.js`);

module.exports = class extends SyncedStringTree {

    _Parsed (change) {

        const parsedChange = super._Parsed(change);

        assert(change.hasOwnProperty(`value`));

        let {value} = change;

        if (value !== undefined) {

            value = FromJson(AsJsonWithSortedKeys(value));

        }

        parsedChange.change.value = value;

        return parsedChange;

    }

};