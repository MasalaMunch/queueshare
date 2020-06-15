"use strict";

const JsonCopy = require(`../json-copy`);
const LocalVersion = require(`../local-version`);
const path = require(`path`);
const RedBlackTree = require(`bintrees`).RBTree;
const StoredJsonLog = require(`../stored-json-log`);
const SyncedJsonTree = require(`../synced-json-tree`);

const folderPaths = require(`../qss-folder-paths`);
const log = require(`../log-to-qss`);
const Value = require(`../qsh-value`);

const SyncedState = class {

    constructor (folder) {

        const storagePath = path.join(folder, folderPaths.syncedState);

        this._storedChanges = new StoredJsonLog(storagePath);
 
        this._localVersionChanges = new Map();

        this._orderedLocalVersions = new RedBlackTree((a, b) => a - b);

        this._syncedJsonTree = new SyncedJsonTree();

        this._syncedJsonTree.events.on(`change`, (c) => {

            this._localVersionChanges.set(c.localVersion, c);

            this._orderedLocalVersions.insert(c.localVersion);

            this._storedChanges.eventuallyAppend(c);

        });

        this._syncedJsonTree.events.on(`localVersionDeletion`, (v) => {

            this._localVersionChanges.delete(v);

            this._orderedLocalVersions.remove(v);

        });

        process.nextTick(() => {

            for (const change of this._storedChanges.Entries()) {

                let somethingWasThrown, thrownThing;

                if (change instanceof Error) {

                    somethingWasThrown = true;

                    thrownThing = change;

                }
                else {

                    try {

                        this.receive(change);

                    } catch (error) {

                        somethingWasThrown = true;

                        thrownThing = error;

                    }

                }

                if (somethingWasThrown) {

                    log(thrownThing);

                }

            }

        });

    }

    Changes () {

        return this.ChangesSince(LocalVersion.oldest);

    }


    ChangesSince (localVersion) {

        localVersion = LocalVersion.Valid(localVersion);

        const iterator = this._orderedLocalVersions.upperBound(localVersion);

        const changes = [];

        while (iterator.data() !== null) {

            changes.push(this._localVersionChanges.get(iterator.data()));

            iterator.next();

        }

        return changes;

    }

    compress () {

        let compressedValue = {};

        for (const {path, value} of this.Changes()) {

            if (path.length === 0) {

                compressedValue = JsonCopy(value);

            } else {

                if (Value.IsPrimitive(compressedValue)) {

                    compressedValue = {};

                }

                let parentValue = compressedValue;

                for (const [i, child] of path.entries()) {

                    if (i === path.length-1) {

                        parentValue[child] = JsonCopy(value);

                    }
                    else {

                        if (Value.IsPrimitive(parentValue[child])) {

                            parentValue[child] = {};

                        }

                        parentValue = parentValue[child];

                    }

                }

            }

        }

        this._syncedJsonTree.write({path: [], value: compressedValue});

        this._storedChanges.write(this.Changes());

    }

    receive (foreignChange) {

        this._syncedJsonTree.receive(foreignChange);

    }

    };

module.exports = SyncedState;
