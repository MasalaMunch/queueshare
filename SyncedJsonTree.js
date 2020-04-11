"use strict";

const AsJson = require(`./AsJson.js`);
const assert = require(`assert`);
const FromJson = require(`./FromJson.js`);
const SyncedStringTree = require(`./SyncedStringTree.js`);

module.exports = class extends SyncedStringTree {

    _Parsed (change) {

        const parsedChange = super._Parsed(change);

        let {value} = change;

        if (value !== undefined) {

            value = FromJson(AsJson(value));

        }

        parsedChange.change.value = value;

        return parsedChange;

    }

};