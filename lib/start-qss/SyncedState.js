"use strict";

const assert = require(`assert`);
const bintrees = require(`bintrees`);
const EventEmitter = require(`events`);
const FsJsonLog = require(`../fs-json-log`);
const LocalVersion = require(`../local-version`);
const path = require(`path`);
const SyncedJsonTree = require(`../synced-json-tree`);

const IsPrimitive = (value) => {

    return typeof value !== `object` || Array.isArray(value);

};

const Copy = (value) => {

    return IsPrimitive(value)? value : JSON.parse(JSON.stringify(value));

};

const SyncedState = class {

    constructor (folder) {

        this.events = new EventEmitter();

        this.fsChangeLog = new FsJsonLog(path.join(folder, `syncedState`));

        this._localVersionChanges = new Map();

        this._orderedLocalVersions = new bintrees.RBTree((a, b) => a - b);

        this._syncedJsonTree = new SyncedJsonTree();

        this._syncedJsonTree.events.on(`change`, (c, dontLog) => {

            this._localVersionChanges.set(c.localVersion, c);

            this._orderedLocalVersions.insert(c.localVersion);

            if (!dontLog) {

                this.fsChangeLog.eventuallyAppend(c);

            }

            this.events.emit(`change`, c);

        });

        this._syncedJsonTree.events.on(`localVersionDeletion`, (v) => {

            this._localVersionChanges.delete(v);

            this._orderedLocalVersions.remove(v);

        });

        process.nextTick(() => {

            for (const change of this.fsChangeLog.Entries()) {

                try {

                    this.receive(change, true);

                } catch (error) {

                }

            }

        });

    }

    ChangeCount () {

        return this._localVersionChanges.size;

    }

    Changes (limit = undefined) {

        return this.ChangesSince(LocalVersion.oldest, limit);

    }

    ChangesSince (localVersion, limit = Infinity) {

        localVersion = LocalVersion.Valid(localVersion);

        assert(typeof limit === `number`);

        assert(limit >= 0);

        const iterator = this._orderedLocalVersions.upperBound(localVersion);

        const changes = [];

        while (iterator.data() !== null && changes.length < limit) {

            changes.push(this._localVersionChanges.get(iterator.data()));

            iterator.next();

        }

        return changes;

    }

    receive (foreignChange, dontLog = false) {

        this._syncedJsonTree.receive(foreignChange, dontLog);

    }

    write (localChange, dontLog = false) {

        this._syncedJsonTree.write(localChange, dontLog);

    }

    Value () {

        let value;

        for (const change of this.Changes()) {

            if (change.path.length === 0) {

                value = Copy(change.value);

            }
            else {

                if (IsPrimitive(value)) {

                    value = {};

                }

                let parentValue = value;

                for (const [i, child] of change.path.entries()) {

                    if (i === change.path.length-1) {

                        parentValue[child] = Copy(change.value);

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

        return value;

    }

    };

module.exports = SyncedState;
