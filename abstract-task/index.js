"use strict";

const assert = require(`assert`);
const doNothing = require(`../do-nothing`);
const Obj = require(`../obj`);
const State = require(`../state`);

const AbstractTask = class extends State {

    constructor (props) {

        props = Obj(props);

        Obj.add(props, {inputs: props.prereqs});

        super(props);

    }

    do () {

        throw new Error(`method not implemented`);

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

    _broadcastFinish () {

        assert(!this.isDone);

        this.isDone = true;

        this.broadcastChange();

    }

    _broadcastStart () {

        assert(!this.hasStarted);

        this.hasStarted = true;

        this.broadcastChange();

    }

    _initialize () {

        Obj.add(this, {hasStarted: false, isDone: false, output: undefined});

        Obj.define(this, {prereqs: [], f: doNothing});

        for (const task of this.prereqs) {

            assert(task instanceof AbstractTask);

        }

        assert(typeof this.f === `function`);

        super._initialize();

    }

    };

module.exports = AbstractTask;
