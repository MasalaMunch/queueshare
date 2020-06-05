"use strict";

const JsonString = require(`../json-string`);
const path = require(`path`);

const KeyAndIntComparison = (a, b) => a[1] - b[1];

const ViaLocalStorage = class {

    constructor (storagePath) {

        this._key = path.resolve(storagePath);

    }

    Value () {

        const storedValue = localStorage.getItem(this._key);

        return storedValue === null? undefined : JSON.parse(storedValue);

    }

    write (value) {

        localStorage.setItem(this._key, JsonString(value));

    }

    };

module.exports = ViaLocalStorage;
