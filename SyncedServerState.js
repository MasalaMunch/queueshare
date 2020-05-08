"use strict";

const add = require(`add`);
const StoredJsonLog = require(`stored-json-log`);
const SyncedJsonTree = require(`synced-json-tree`);

module.exports = class extends SyncedJsonTree {

    constructor (config) {

        super(config);

        const {file} = config;

        add(this, {_storage: new StoredJsonLog(file)});

        for (const {changes} of this._storage.Entries()) {

            for (const c of changes) {

                this.restore(c);

            }

        }

    }

    compressStorage () {

        this._storage.overwrite({changes: Array.from(this.Changes())});

    }

    receive (foreignChange) {

        const localVersion = this.LocalVersion();

        super.receive(foreignChange);

        const changes = Array.from(this.ChangesSince(localVersion));

        if (changes.length > 0) {

            this._storage.addToWriteQueue({changes});

        }

    }

    };
