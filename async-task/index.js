"use strict";

const AbstractTask = require(`../abstract-task`);

const AsyncTask = class extends AbstractTask {

    async do () {

        this._broadcastStart();

        this._broadcastFinish(await this.f());

    }

    };

module.exports = AsyncTask;
