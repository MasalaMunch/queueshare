"use strict";

const EventEmitter = require(`events`);
const JsonString = require(`../json-string`);
const path = require(`path`);

const LsJson = class {

    constructor (lsPath) {

        this.events = new EventEmitter();

        this._key = path.resolve(lsPath);

        this._value = undefined;

        process.nextTick(() => this._emitChange());

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

        const lsValue = localStorage.getItem(this._key);

        let value;

        if (lsValue !== null) {

            try {

                value = JSON.parse(lsValue);

            } catch (error) {

            }

        }

        this._value = value;

        this.events.emit(`change`, value);

    }

    };

module.exports = LsJson;
