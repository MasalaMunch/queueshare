"use strict";

const AbstractTask = require(`../abstract-task`);

const Task = class extends AbstractTask {

    do () {

        this._broadcastStart();

        this._broadcastFinish(this.f());

    }

    };

module.exports = Task;
