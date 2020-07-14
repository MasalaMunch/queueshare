"use strict";

const assert = require(`assert`);
const EventEmitter = require(`events`);

const SafeEventEmitter = class extends EventEmitter {

    constructor (...args) {

        super(...args);

        this.hasStarted = false;

    }

    emit (...args) {

        assert(this.hasStarted);

        super.emit(...args);

    }

    start () {

        assert(!this.hasStarted);

        this.hasStarted = true;

        this.emit(`hasStarted`);

    }

    };

module.exports = SafeEventEmitter;
