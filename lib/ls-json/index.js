"use strict";

const EventEmitter = require(`events`);
const JsonOrUndefined = require(`../json-or-undefined`);
const JsonString = require(`../json-string`);
const path = require(`path`);

const LsJson = class {

    constructor (lsPath) {

        this.events = new EventEmitter();

        this._key = path.resolve(lsPath);

        this._value = undefined;

        setTimeout(() => this._emitChange());

        window.addEventListener(`storage`, (e) => {

            if (this._key === e.key) {

                this._emitChange();

            }

        });

    }

    Value () {

        return this._value;

    }

    write (value) {

        localStorage.setItem(this._key, JsonString(value));

        this._emitChange();

    }

    _emitChange () {

        this._value = JsonOrUndefined(localStorage.getItem(this._key));

        this.events.emit(`change`, this._value);

    }

    };

module.exports = LsJson;
