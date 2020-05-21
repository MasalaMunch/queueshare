"use strict";

const assert = require(`assert`);
const StoredJsonLog = require(`../stored-json-log`);
const SyncedJsonTree = require(`../synced-json-tree`);

const events = require(`../qss-events`);

const SyncedState = class extends SyncedJsonTree {

    constructor (dataPaths) {

        super();

        this._hasLoadedStorage = false;

        this._storage = new StoredJsonLog(dataPaths.syncedState);

        // in the future, on change, when a media key is referenced, 
        // check if it exists and if it doesn't, try downloading it

        process.nextTick(() => {

            for (const changes of this._storage.Entries()) {

                for (const c of changes) {

                    this.restore(c);

                }

            }

            this._hasLoadedStorage = true;

            this.on(`change`, (c) => {

                this._storage.eventuallyAppend([c]);                

            });

        });

        events.on(`folderLockAcquisition`, () => {

            events.on(`maintenance`, () => {

                if (this._hasLoadedStorage) {

                    this._storage.write([...this.Changes()]);

                    //TODO syncronously delete dereferenced media

                    //TODO syncronously remove tombstones

                }

            });

        });

    }

    };

module.exports = SyncedState;
