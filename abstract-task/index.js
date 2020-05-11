"use strict";

const add = require(`../add`);
const assert = require(`assert`);
const define = require(`../define`);
const doNothing = require(`../do-nothing`);
const ShallowCopy = require(`../shallow-copy`);
const State = require(`../state`);

const AbstractTask = class extends State {

    constructor (props) {

        props = ShallowCopy(props);

        define(props, {prereqs: [], f: doNothing});

        const {prereqs, f} = props;

        for (const task of prereqs) {

            assert(task instanceof AbstractTask);

        }

        assert(typeof f === `function`);

        add(props, {

            inputs: prereqs,

            hasStarted: false,

            isDone: false,

            output: undefined,

            });

        super(props);

    }

    do () {

        assert(!this.hasStarted);

        this.hasStarted = true;

        this.broadcastChange();

    }

    update () {

        if (this.hasStarted) {

            return;

        }

        for (const task of this.prereqs) {

            if (!task.isDone) {

                return;

            }

        }

        this.do();

    }

    _broadcastCompletion (output) {

        this.output = output;

        this.isDone = true;

        this.broadcastChange();

    }

    };

module.exports = AbstractTask;