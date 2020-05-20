"use strict";

const assert = require(`assert`);
const StoredJsonLog = require(`../stored-json-log`);
const SyncedJsonTree = require(`../synced-json-tree`);

const events = require(`../qss-events`);

const SyncedState = class extends SyncedJsonTree {

    constructor (dataPaths) {

        super();

        this._hasLoadedStorage = false;

        this._isLoadingStorage = false;

        this._storage = new StoredJsonLog(dataPaths.syncedState);

        this.on(`change`, (c) => {

            if (!this._isLoadingStorage) {

                this._storage.eventuallyAppend({changes: [c]});                

            }

        });

        // in the future, on change, when a media key is referenced, 
        // check if it exists and if it doesn't, try downloading it

        process.nextTick(() => {

            this._isLoadingStorage = true;

            for (const {changes} of this._storage.Entries()) {

                for (const c of changes) {

                    this.restore(c);

                }

            }

            this._isLoadingStorage = false;

            this._hasLoadedStorage = true;

        });

        events.on(`folderLockAcquisition`, () => {

            events.on(`maintenance`, () => {

                if (this._hasLoadedStorage) {

                    this._storage.write({changes: [...this.Changes()]});

                    //TODO delete dereferenced media

                    //TODO compress this server's queue (i.e. remove tombstones)
                }

            });

        });

    }

    };

module.exports = SyncedState;
