"use strict";

module.exports = class extends Map {

    constructor (Value) {

        super();

        this._Value = Value;

    }

    get (key) {

        if (!this.has(key)) {

            this.set(key, this._Value(key));

        }

        return super.get(key);

    }

};