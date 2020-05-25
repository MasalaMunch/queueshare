"use strict";

const assert = require(`assert`);
const StoredJsonLog = require(`../stored-json-log`);
const SyncedJsonTree = require(`../synced-json-tree`);

const events = require(`../qss-events`);

const SyncedState = class extends SyncedJsonTree {

    constructor (dataPaths) {

        super();

        this._storage = new StoredJsonLog(dataPaths.syncedState);

        // in the future, on change, when a media key is referenced, 
        // check if it exists and if it doesn't, try downloading it

        events.on(`folderLockAcquisition`, () => {

            for (const changes of this._storage.Entries()) {

                for (const c of changes) {

                    this.restore(c);

                }

            }

            const eventuallyStore = (change) => {

                this._storage.eventuallyAppend([change]);

            };

            this.events.on(`change`, eventuallyStore);

            events.on(`maintenance`, () => {

                this.events.off(`change`, eventuallyStore);

                this.write({path: [], value: this.Value()});

                this._storage.write([...this.Changes()]);

                this.events.on(`change`, eventuallyStore);

                //TODO delete dereferenced media

            });

        });

    }

    };

module.exports = SyncedState;
