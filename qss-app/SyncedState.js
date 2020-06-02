"use strict";

const assert = require(`assert`);
const JsonCopy = require(`../json-copy`);
const path = require(`path`);
const StoredJsonLog = require(`../stored-json-log`);
const SyncedJsonTree = require(`../synced-json-tree`);

const events = require(`../qss-events`);
const folderPaths = require(`../qss-folder-paths`);

const IsPrimitive = (value) => {

    return typeof value !== `object` || Array.isArray(value);

};

const SyncedState = class extends SyncedJsonTree {

    constructor (folder) {

        super();

        const storagePath = path.join(folder, folderPaths.syncedState);

        this._storage = new StoredJsonLog(storagePath);

        process.nextTick(() => {

            for (const foreignChange of this._storage.Entries()) {

                this.receive(foreignChange, true);

            }

        });

        events.once(`folderIsReady`, () => {

            events.on(`maintenance`, () => {

                this.write({path: [], value: this._CompressedValue()}, true);

                this._storage.write(this.Changes());

                //TODO delete dereferenced media

            });

            // in the future, on change, when media is referenced, 
            // check if it exists and if it doesn't, try downloading it

        });

    }

    receive (foreignChange, dontStore = false) {

        const info = super.receive(foreignChange);

        if (!dontStore && !info.wasRejected) {

            this._eventuallyStore(foreignChange);

        }

        return info;

    }

    write (localChange, dontStore = false) {

        const info = super.write(localChange);

        if (!dontStore) {

            this._eventuallyStore(info.foreignChange);            

        }

        return info;

    }

    _CompressedValue () {

        let compressedValue = {};

        for (let {path, value} of this.Changes()) {

            value = JsonCopy(value);

            if (path.length === 0) {

                compressedValue = value;

            } else {

                if (IsPrimitive(compressedValue)) {

                    compressedValue = {};

                }

                let parentValue = compressedValue;

                for (const [i, child] of path.entries()) {

                    if (i === path.length-1) {

                        parentValue[child] = value;

                    }
                    else {

                        if (IsPrimitive(parentValue[child])) {

                            parentValue[child] = {};

                        }

                        parentValue = parentValue[child];

                    }

                }

            }

        }

        return compressedValue;

    }

    _eventuallyStore (foreignChange) {

        this._storage.eventuallyAppend(foreignChange);

    }

    };

module.exports = SyncedState;
