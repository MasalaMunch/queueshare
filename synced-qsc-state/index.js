"use strict";

const eventually = require(`../eventually`);
const Interval = require(`../interval`);
const JsonFetch = require(`../json-fetch`);
const SyncedJsonTree = require(`../synced-json-tree`);
const HeapedSet = require(`../heaped-set`);
const querystring = require(`querystring`);

const changeDelay = require(`../qsc-change-delay`);
const IsDev = require(`../qsc-is-dev`);
const serverApiPaths = require(`../qss-api-paths`);

const SyncedState = class {

    constructor () {

        this._heapedLocalVersions = new HeapedSet((a, b) => b - a);

        this._localVersionChanges = new Map();

        this._serverLocalVersion = undefined;

        this._syncedJsonTree = new SyncedJsonTree();

        this._syncedJsonTree.events.on(`change`, (c) => {

            console.log(c);

        }); 

        this._syncedJsonTree.events.on(`localVersionDeletion`, (v) => {

            this._heapedLocalVersions.delete(v);

            this._localVersionChanges.delete(v);

        });

        Interval.set(async () => {

            let changes;

            try {

                changes = await JsonFetch(

                    serverApiPaths.syncedStateChanges

                    + `?` 

                    + querystring.stringify(

                        {localVersion: this._serverLocalVersion},

                        )

                    );

            } catch (error) {

                if (IsDev()) {

                    console.error(error);

                }

                return;

            }

            for (const c of changes) {

                await eventually(() => {

                    this._syncedJsonTree.receive(c);

                    this._serverLocalVersion = c.localVersion;

                });

            }

        }, changeDelay, true);

        Interval.set(async () => {

            const localVersionToSend = this._heapedLocalVersions.min;

            if (localVersionToSend !== undefined) {

                try {

                    await fetch(serverApiPaths.syncedStateChanges, {

                        body: JSON.stringify(

                            this._localVersionChanges.get(localVersionToSend)

                            ),

                        headers: {[`Content-Type`]: `application/json`},

                        method: `POST`,

                    });

                } catch (error) {

                    if (IsDev()) {

                        console.error(error);

                    }

                    return;

                }

                this._heapedLocalVersions.delete(localVersionToSend);

                this._localVersionChanges.delete(localVersionToSend);

            }

        }, changeDelay, true);

    }

    write (localChange) {

        const {change} = this._syncedJsonTree.write(localChange);

        this._heapedLocalVersions.add(change.localVersion);

        this._localVersionChanges.set(change.localVersion, change);

    }

    };

module.exports = SyncedState;
