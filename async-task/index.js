"use strict";

const AbstractTask = require(`../abstract-task`);

module.exports = class extends AbstractTask {

    async do () {

        super.do();

        this._broadcastCompletion((await this.f()));

    }

    };