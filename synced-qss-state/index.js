"use strict";

const assert = require(`assert`);
const JsonCopy = require(`../json-copy`);
const path = require(`path`);
const StoredJsonLog = require(`../stored-json-log`);
const SyncedJsonTree = require(`../synced-json-tree`);

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

    }

    compress () {

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

        this.write({path: [], value: compressedValue}, true);

        this._storage.write(this.Changes());

    }

    receive (foreignChange, _dontStore = false) {

        const info = super.receive(foreignChange);

        if (!_dontStore && !info.wasRejected) {

            this._eventuallyStore(foreignChange);

        }

        return info;

    }

    write (localChange, _dontStore = false) {

        const info = super.write(localChange);

        if (!_dontStore) {

            this._eventuallyStore(info.foreignChange);            

        }

        return info;

    }

    _eventuallyStore (foreignChange) {

        this._storage.eventuallyAppend(foreignChange);

    }

    };

module.exports = SyncedState;
