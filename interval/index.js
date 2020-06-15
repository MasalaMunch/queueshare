"use strict";

const assert = require(`assert`);

const Interval = class {

    constructor (f, delay, dontDelayStart = false) {

        assert(typeof f === `function`);

        assert(typeof delay === `number` && delay >= 0);

        assert(typeof dontDelayStart === `boolean`);

        this._f = f;

        this._delay = delay;

        this._dontDelayStart = dontDelayStart;

        this._timeout = undefined;

    }

    clear () {

        assert(this._timeout !== undefined);

        clearTimeout(this._timeout);

        this._timeout = undefined;

    }

    reset () {

        this.clear();

        this.set();

    }

    set (_isStart = true) {

        assert(this._timeout === undefined);

        this._timeout = setTimeout(async () => {

            await this._f();

            this._timeout = undefined;

            this.set(false);

        }, _isStart && this._dontDelayStart? 0 : this._delay);

    }

    };

Interval.set = (...constructorArgs) => {

    const interval = new Interval(...constructorArgs);

    interval.set();

    return interval;

};

module.exports = Interval;
