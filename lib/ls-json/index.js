"use strict";

const Elm = require(`../elm`);
const JsonString = require(`../json-string`);
const path = require(`path`);
const SafeEventEmitter = require(`../safe-event-emitter`);

const LsJson = class {

    constructor (lsPath, ValidValue, defaultValue) {

        this.events = new SafeEventEmitter();

        this._defaultValue = defaultValue;

        this._key = path.resolve(lsPath);

        this._ValidValue = ValidValue;

        this.events.once(`hasStarted`, () => {

            this._emitChange();

            Elm.on(window, `storage`, (e) => {

                if (this._key === e.key) {

                    this._emitChange();

                }

            });

        });

    }

    Value () {

        const lsValue = localStorage.getItem(this._key);

        let value;

        if (lsValue === null) {

            value = this._defaultValue;

        }
        else {

            try {

                value = this._ValidValue(JSON.parse(lsValue));

            } catch (error) {

                value = this._defaultValue;

            }

        }

        return value;

    }

    write (value) {

        localStorage.setItem(this._key, JsonString(this._ValidValue(value)));

        if (this.events.hasStarted) {

            this._emitChange();

        }

    }

    _emitChange () {

        this.events.emit(`change`, this.Value());

    }

    };

module.exports = LsJson;
