"use strict";

const assert = require(`assert`);
const StoredJsonLog = require(`../stored-json-log`);
const SyncedJsonTree = require(`../synced-json-tree`);

const events = require(`../qss-events`);

const SyncedState = class extends SyncedJsonTree {

    constructor (dataPaths) {

        super();

        this._storage = new StoredJsonLog(dataPaths.syncedState);

        events.on(`folderLockAcquisition`, () => {

            // in the future, on change, when a media key is referenced, 
            // check if it exists and if it doesn't, try downloading it

            for (const {changes} of this._storage.Entries()) {

                for (const c of changes) {

                    this.restore(c);

                }

            }

            this.on(`change`, (c) => {

                this._storage.eventuallyAppend({changes: [c]});

            });

            events.on(`maintenance`, () => {

                //TODO delete dereferenced media

                //TODO compress this server's queue (remove tombstones)

                this._storage.write({changes: [...this.Changes()]});

            });

        });

    }

    };

module.exports = SyncedState;
