"use strict";

const assert = require(`assert`);
const doNothing = require(`../do-nothing`);
const define = require(`../define`);
const extend = require(`../extend`);
const transform = require(`../transform`);

const State = class {

    constructor (props) {

        extend(this, props);

        this._initialize();

    }

    broadcastChange () {

        for (const state of this.outputs) {

            state.update();

        }

    }

    _initialize () {

        extend(this, {outputs: new Set()});

        define(this, {inputs: [], update: doNothing});

        for (const state of this.inputs) {

            assert(state instanceof State);

            state.outputs.add(this);

        }

        assert(typeof this.update === `function`);

        transform(this, (v) => typeof v === `function`? v.bind(this) : v);

    }

    };

module.exports = State;
