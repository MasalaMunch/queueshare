"use strict";

const assert = require(`assert`);
const EventEmitter = require(`events`);

const SafeEventEmitter = class extends EventEmitter {

    constructor (...args) {

        super(...args);

        this.hasStartedEmitting = false;

    }

    emit (...args) {

        assert(this.hasStartedEmitting);

        super.emit(...args);

    }

    startEmitting () {

        assert(!this.hasStartedEmitting);

        this.hasStartedEmitting = true;

        this.emit(`hasStartedEmitting`);

    }

    };

module.exports = SafeEventEmitter;
