"use strict";

const assert = require(`assert`);

const Interval = class {

    constructor (f, delay) {

        assert(typeof f === `function`);

        this._f = f;

        this._delay = delay;

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

    set () {

        assert(this._timeout === undefined);

        this._timeout = setTimeout(async () => {

            await this._f();

            this._timeout = undefined;

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
