"use strict";

const assert = require(`assert`);

const Interval = class {

    constructor (f, delay = 0) {

        assert(typeof f === `function`);

        assert(typeof delay === `number` && delay >= 0);

        this._delay = delay;

        this._f = f;

        this._timerId = undefined;

    }

    clear () {

        clearTimeout(this._timerId);

    }

    set () {

        this.clear();

        this._timerId = setTimeout(async () => {

            await this._f();

            this.set();

        }, this._delay);            

    }

    };

Interval.set = (...constructorArgs) => {

    const interval = new Interval(...constructorArgs);

    interval.set();

    return interval;

};

module.exports = Interval;
