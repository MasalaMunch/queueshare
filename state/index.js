"use strict";

const add = require(`../add`);
const assert = require(`assert`);
const define = require(`../define`);
const doNothing = require(`../do-nothing`);
const ShallowCopy = require(`../shallow-copy`);
const transform = require(`../transform`);

const State = class {

    constructor (props) {

        props = ShallowCopy(props);

        transform(props, (v) => (typeof v === `function`? v.bind(this) : v));

        define(props, {inputs: [], update: doNothing});

        const {inputs, update} = props;

        for (const state of inputs) {

            assert(state instanceof State);

        }

        assert(typeof update === `function`);

        add(this, props, {outputs: new Set()});

        for (const state of this.inputs) {

            state.outputs.add(this);

        }

    }

    broadcastChange () {

        for (const state of this.outputs) {

            state.update();

        }

    }

    };

module.exports = State;