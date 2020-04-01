"use strict";

const EscapedForRegExp = require(`escape-string-regexp`);

const PrefixRegExp = (string) => new RegExp(`^` + EscapedForRegExp(string));

const firstNumber = 0;

const KeyAndNumberComparison = (a, b) => a[1] - b[1];

module.exports = class {

    constructor ({path}) {
        
        this._prefix = (path[path.length-1] === `/`)? path : path+`/`;

        const sortedKeysAndNumbers = this._SortedKeysAndNumbers();

        const lastKeyAndNumber = (
            sortedKeysAndNumbers[sortedKeysAndNumbers.length-1]
            );

        this._nextNumber = (
            (lastKeyAndNumber === undefined)? 
            firstNumber : lastKeyAndNumber[1]+1
            );

    }

    _SortedKeysAndNumbers () {

        if (this._sortedKeysAndNumbers === undefined) {

            let i;
            const localStorageLength = localStorage.length;
            let key;
            const prefixRegExp = PrefixRegExp(this._prefix);
            const keysAndNumbers = [];
            const prefixLength = this._prefix.length;

            for (i=0; i<localStorageLength; i++) {

                key = localStorage.key(i);

                if (prefixRegExp.test(key)) {

                    keysAndNumbers.push(
                        [key, Number(key.substring(prefixLength, key.length))]
                        );

                }

            }

            keysAndNumbers.sort(KeyAndNumberComparison);
            this._sortedKeysAndNumbers = keysAndNumbers;

        }

        return this._sortedKeysAndNumbers;

    }

    Entries () {

        let i;
        const sortedKeysAndNumbers = this._SortedKeysAndNumbers();
        const count = sortedKeysAndNumbers.length;
        const entries = new Array(count);

        for (i=0; i<count; i++) {

            entries[i] = localStorage.getItem(sortedKeysAndNumbers[i][0]);

        }

        return entries;

    }

    clear () {

        let i;
        const keysAndNumbers = this._SortedKeysAndNumbers();

        for (i=keysAndNumbers.length-1; i>=0; i--) {

            localStorage.removeItem(keysAndNumbers[i][0]);

        }

        this._nextNumber = firstNumber; 
        //^ not necessary, but might as well do it to reduce future key lengths

        this._sortedKeysAndNumbers = [];

    }

    addToWriteQueue (entry) {

        localStorage.setItem(this._prefix+String(this._nextNumber++), entry);

        this._sortedKeysAndNumbers = undefined;

    }

    };