"use strict";

const AbstractTask = require(`../abstract-task`);

module.exports = class extends AbstractTask {

    do () {

        super.do();

        this._broadcastCompletion(this.f());

    }

    };