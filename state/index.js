"use strict";

const assert = require(`assert`);
const doNothing = require(`../do-nothing`);
const Obj = require(`../obj`);

const State = class {

    constructor (props) {

        Obj.add(this, props);

        this._initialize();

    }

    broadcastChange () {

        for (const state of this.outputs) {

            state.update();

        }

    }

    _initialize () {

        Obj.add(this, {outputs: new Set()});

        Obj.define(this, {inputs: [], update: doNothing});

        for (const state of this.inputs) {

            assert(state instanceof State);

            state.outputs.add(this);

        }

        assert(typeof this.update === `function`);

        Obj.transform(this, (v) => typeof v === `function`? v.bind(this) : v);

    }

    };

module.exports = State;
