"use strict";

const StoredJsonLog = require(`stored-json-log`);
const SyncedJsonTree = require(`synced-json-tree`);

module.exports = class extends SyncedJsonTree {

    constructor (path) {

        super();

        this._storedJsonLog = new StoredJsonLog(path);

        for (const {changes} of this._storedJsonLog.Entries()) {

            for (const c of changes) {

                this.restore(c);

            }

        }

        this.on(`change`, (c) => {

            this._storedJsonLog.eventuallyAppend({changes: [c]});

        });

    }

    compressStorage () {

        this._storedJsonLog.write({changes: Array.from(this.Changes())});

    }


    };
