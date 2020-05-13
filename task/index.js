"use strict";

const AbstractTask = require(`../abstract-task`);

const Task = class extends AbstractTask {

    do () {

        this._broadcastStart();

        const output = this.f();

        this._broadcastFinish(output);

    }

    };

module.exports = Task;
