"use strict";

const assert = require(`assert`);
const EventEmitter = require(`events`);
const JsonOrUndefined = require(`../json-or-undefined`);
const JsonString = require(`../json-string`);
const path = require(`path`);

const LsJson = class {

    constructor (lsPath) {

        this.events = new EventEmitter();

        this._hasStartedChanging = false;

        this._key = path.resolve(lsPath);

    }

    startChanging () {

        assert(!this._hasStartedChanging);

        this._hasStartedChanging = true;

        this._emitChange();

        window.addEventListener(`storage`, (e) => {

            if (this._key === e.key) {

                this._emitChange();

            }

        });

    }

    Value () {

        return JsonOrUndefined(localStorage.getItem(this._key));

    }

    write (value) {

        assert(this._hasStartedChanging);

        localStorage.setItem(this._key, JsonString(value));

        this._emitChange();

    }

    _emitChange () {

        this.events.emit(`change`, this.Value());

    }

    };

module.exports = LsJson;
