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

        events.on(`maintenance`, () => {

            this.write({path: [], value: this._CompressedValue()});

        });

        const storage = (

            new StoredJsonLog(path.join(folder, folderPaths.syncedState))

            );

        process.nextTick(() => {

            for (const change of storage.Entries()) {

                this.receive(change);

            }

        });

        events.once(`folderIsReady`, () => {

            events.on(`maintenance`, () => {

                storage.write(this.Changes());

                //TODO delete dereferenced media

            });

            this.events.on(`change`, (change) => {

                storage.eventuallyAppend(change);

            });

            // in the future, on change, when media is referenced, 
            // check if it exists and if it doesn't, try downloading it

        });

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

    };

module.exports = SyncedState;
