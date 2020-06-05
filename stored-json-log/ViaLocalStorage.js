"use strict";

const EscapedForRegex = require(`escape-string-regexp`);
const JsonString = require(`../json-string`);
const path = require(`path`);

const firstInt = 0;

const KeyAndIntComparison = (a, b) => a[1] - b[1];

const ViaLocalStorage = class {

    constructor (storagePath) {

        this._prefix = path.resolve(storagePath) + path.sep;

        const sortedKeysAndInts = this._SortedKeysAndInts();

        this._nextInt = (

            sortedKeysAndInts.length === 0?

            firstInt : 1 + sortedKeysAndInts[sortedKeysAndInts.length-1][1]

            );

    }

    Entries () {

        let i;

        const sortedKeysAndInts = this._SortedKeysAndInts();

        const entryCount = sortedKeysAndInts.length;

        const entries = new Array(entryCount);

        for (i=0; i<entryCount; i++) {

            entries[i] = JSON.parse(

                localStorage.getItem(sortedKeysAndInts[i][0])

                );

        }

        return entries;

    }

    eventuallyAppend (entry) {

        this._append([entry]);

    }

    write (entries) {

        let i;

        const keysAndInts = this._SortedKeysAndInts();

        for (i=keysAndInts.length-1; i>=0; i--) {

            localStorage.removeItem(keysAndInts[i][0]);

        }

        this._nextInt = firstInt;

        this._append(entries);

    }

    _append (entries) {

        let i;

        const entryCount = entries.length;

        const prefix = this._prefix;

        let nextInt = this._nextInt;

        for (i=0; i<entryCount; i++) {

            localStorage.setItem(

                prefix + String(nextInt), 

                JsonString(entries[i]),

                );

            nextInt++;

        }

        this._nextInt = nextInt;

        this._sortedKeysAndInts = undefined;

    }

    _SortedKeysAndInts () {

        if (this._sortedKeysAndInts === undefined) {

            let i;

            const localStorageLength = localStorage.length;

            let key;

            const prefixRegExp = new RegExp(

                `^` + EscapedForRegex(this._prefix)

                );

            const keysAndInts = [];

            const prefixLength = this._prefix.length;

            for (i=0; i<localStorageLength; i++) {

                key = localStorage.key(i);

                if (prefixRegExp.test(key)) {

                    keysAndInts.push(

                        [key, Number(key.substring(prefixLength, key.length))]

                        );

                }

            }

            keysAndInts.sort(KeyAndIntComparison);

            this._sortedKeysAndInts = keysAndInts;

        }

        return this._sortedKeysAndInts;

    }

    };

module.exports = ViaLocalStorage;
