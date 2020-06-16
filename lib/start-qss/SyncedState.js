"use strict";

const assert = require(`assert`);
const JsonCopy = require(`../json-copy`);
const LocalVersion = require(`../local-version`);
const path = require(`path`);
const RedBlackTree = require(`bintrees`).RBTree;
const StoredJsonLog = require(`../stored-json-log`);
const SyncedJsonTree = require(`../synced-json-tree`);

const eventuallyRestart = require(`./eventuallyRestart.js`);
const folderPaths = require(`./folderPaths.js`);
const log = require(`../log-to-qss`);

const IsPrimitive = (value) => {

    return typeof value !== `object` || Array.isArray(value);

};

const SyncedState = class {

    constructor (folder) {

        const storagePath = path.join(folder, folderPaths.syncedState);

        this._storedForeignChanges = new StoredJsonLog(storagePath);
 
        this._localVersionChanges = new Map();

        this._orderedLocalVersions = new RedBlackTree((a, b) => a - b);

        this._syncedJsonTree = new SyncedJsonTree();

        this._syncedJsonTree.events.on(`change`, (c) => {

            this._localVersionChanges.set(c.localVersion, c);

            this._orderedLocalVersions.insert(c.localVersion);

        });

        this._syncedJsonTree.events.on(`localVersionDeletion`, (v) => {

            this._localVersionChanges.delete(v);

            this._orderedLocalVersions.remove(v);

        });

        process.nextTick(() => {

            this._loadStorage();

            this._syncedJsonTree.write({

                path: [], 

                value: this._CompressedValue(),

                });

            this._compressStorage();

        });

    }

    Changes (limit = undefined) {

        return this.ChangesSince(LocalVersion.oldest, limit);

    }

    ChangesSince (localVersion, limit = Infinity) {

        localVersion = LocalVersion.Valid(localVersion);

        assert(typeof limit === `number` && limit >= 0);

        const iterator = this._orderedLocalVersions.upperBound(localVersion);

        const changes = [];

        while (iterator.data() !== null) {

            if (changes.length >= limit) {

                break;

            }

            changes.push(this._localVersionChanges.get(iterator.data()));

            iterator.next();

        }

        return changes;

    }

    compress () {

        if (this._changeCount > 1000) {

            eventuallyRestart(`The database needs maintenance.`);

        }
        else {

            this._compressStorage();

        }

    }

    receive (foreignChange, _dontStore = false) {

        const {wasRejected} = this._syncedJsonTree.receive(foreignChange);

        if (!_dontStore && !wasRejected) {

            this._storedForeignChanges.eventuallyAppend(foreignChange);

        }

    }

    get _changeCount () {

        return this._localVersionChanges.size;

    }

    _CompressedValue () {

        let compressedValue = {};

        for (const {path, value} of this.Changes()) {

            if (path.length === 0) {

                compressedValue = JsonCopy(value);

            }
            else {

                if (IsPrimitive(compressedValue)) {

                    compressedValue = {};

                }

                let parentValue = compressedValue;

                for (const [i, child] of path.entries()) {

                    if (i === path.length-1) {

                        parentValue[child] = JsonCopy(value);

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

    _compressStorage () {

        this._storedForeignChanges.write(this.Changes());

    }

    _loadStorage () {

        for (const foreignChange of this._storedForeignChanges.Entries()) {

            let somethingWasThrown, thrownThing;

            if (foreignChange instanceof Error) {

                somethingWasThrown = true;

                thrownThing = foreignChange;

            }
            else {

                try {

                    this.receive(foreignChange, true);

                } catch (error) {

                    somethingWasThrown = true;

                    thrownThing = error;

                }

            }

            if (somethingWasThrown) {

                log(thrownThing);

            }

        }

    }

    };

module.exports = SyncedState;
