"use strict";

const assert = require(`assert`);
const doNothing = require(`../do-nothing`);
const Obj = require(`../obj`);
const State = require(`../state`);

const AbstractTask = class extends State {

    constructor (props) {

        //TODO allow overriding f() in class

        props = Obj(props);

        Obj.add(props, {

            inputs: props.prereqs,

            hasStarted: false,

            isDone: false,

            output: undefined,

            });

        Obj.define(props, {prereqs: [], f: doNothing});

        for (const task of props.prereqs) {

            assert(task instanceof AbstractTask);

        }

        assert(typeof props.f === `function`);

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
