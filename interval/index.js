"use strict";

const assert = require(`assert`);

const Interval = class {

    constructor (f, delay, dontDelayStart = false) {

        assert(typeof f === `function`);

        assert(typeof delay === `number` && delay >= 0);

        assert(typeof dontDelayStart === `boolean`);

        this._delay = delay;

        this._dontDelayStart = dontDelayStart;

        this._f = f;

        this._hasBeenDestroyed = false;

        this._timeout = undefined;

    }

    destroy () {

        clearTimeout(this._timeout);

        this._hasBeenDestroyed = true;

    }

    set (_isStart = true) {

        if (!this._hasBeenDestroyed) {

            clearTimeout(this._timeout);

            this._timeout = setTimeout(async () => {

                await this._f();

                this.set(false);

            }, _isStart && this._dontDelayStart? 0 : this._delay);            

        }

    }

    };

Interval.set = (...constructorArgs) => {

    const interval = new Interval(...constructorArgs);

    interval.set();

    return interval;

};

module.exports = Interval;
