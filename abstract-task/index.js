"use strict";

const assert = require(`assert`);
const doNothing = require(`../do-nothing`);
const define = require(`../define`);
const extend = require(`../extend`);
const Extended = require(`../extended`);
const State = require(`../state`);

const AbstractTask = class extends State {

    constructor (props) {

        super(Extended(props, {inputs: props? props.prereqs : undefined}));

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

    _broadcastFinish (output) {

        assert(!this.isDone);

        this.isDone = true;

        this.output = output;

        this.broadcastChange();

    }

    _broadcastStart () {

        assert(!this.hasStarted);

        this.hasStarted = true;

        this.broadcastChange();

    }

    _initialize () {

        extend(this, {hasStarted: false, isDone: false, output: undefined});

        define(this, {prereqs: [], f: doNothing});

        for (const task of this.prereqs) {

            assert(task instanceof AbstractTask);

        }

        assert(typeof this.f === `function`);

        super._initialize();

    }

    };

module.exports = AbstractTask;
