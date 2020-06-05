"use strict";

const JsonString = require(`../json-string`);

const KeyAndIntComparison = (a, b) => a[1] - b[1];

const ViaLocalStorage = class {

    constructor (key) {

        this._key = key;

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
