"use strict";

const AbstractTask = require(`../abstract-task`);

module.exports = class extends AbstractTask {

    do () {

        this._broadcastStart();

        const output = this.f();

        this._broadcastFinish(output);

    }

    };
