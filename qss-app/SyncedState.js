"use strict";

const assert = require(`assert`);
const JsonCopy = require(`../json-copy`);
const StoredJsonLog = require(`../stored-json-log`);
const SyncedJsonTree = require(`../synced-json-tree`);

const events = require(`../qss-events`);

const IsPrimitive = (json) => typeof json !== `object` || Array.isArray(json);

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

                this.write({path: [], value: this._AsJson()});

                this._storage.write([...this.Changes()]);

                this.events.on(`change`, eventuallyStore);

                //TODO delete dereferenced media

            });

        });

    }

    _AsJson () {

        let asJson = {};

        for (let {path, value} of this.Changes()) {

            value = JsonCopy(value);

            if (path.length === 0) {

                asJson = value;

            } else {

                if (IsPrimitive(asJson)) {

                    asJson = {};

                }

                let currentJson = asJson;

                for (const [i, child] of path.entries()) {

                    if (i === path.length-1) {

                        currentJson[child] = value;

                    }
                    else {

                        if (IsPrimitive(currentJson[child])) {

                            currentJson[child] = {};

                        }

                        currentJson = currentJson[child];                        

                    }

                }

            }

        }

        return asJson;

    }

    };

module.exports = SyncedState;
