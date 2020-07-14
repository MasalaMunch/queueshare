"use strict";

const JsonOrUndefined = require(`../json-or-undefined`);
const JsonString = require(`../json-string`);
const path = require(`path`);
const SafeEventEmitter = require(`../safe-event-emitter`);

const LsJson = class {

    constructor (lsPath) {

        this.events = new SafeEventEmitter();

        this._key = path.resolve(lsPath);

        this.events.once(`hasStarted`, () => {

            this._emitChange();

            window.addEventListener(`storage`, (e) => {

                if (this._key === e.key) {

                    this._emitChange();

                }

            });

        });

    }

    Value () {

        return JsonOrUndefined(localStorage.getItem(this._key));

    }

    write (value) {

        localStorage.setItem(this._key, JsonString(value));

        if (this.events.hasStarted) {

            this._emitChange();

        }

    }

    _emitChange () {

        this.events.emit(`change`, this.Value());

    }

    };

module.exports = LsJson;
