"use strict";

const AbstractTask = require(`../abstract-task`);

const AsyncTask = class extends AbstractTask {

    async do () {

        this._broadcastStart();

        const output = await this.f();

        this._broadcastFinish(output);

    }

    };

module.exports = AsyncTask;
