"use strict";

const EventEmitter = require(`events`);
const eventually = require(`../eventually`);
const Interval = require(`../interval`);
const JsonFetch = require(`../json-fetch`);
const SyncedJsonTree = require(`../synced-json-tree`);
const querystring = require(`querystring`);

const changeDelay = require(`../qsc-change-delay`);
const IsDev = require(`../qsc-is-dev`);
const Change = require(`../qsh-change`);
const serverApiPaths = require(`../qss-api-paths`);

const SyncedState = class {

    constructor () {

        this.events = new EventEmitter();

        this._serverLocalVersion = undefined;

        this._syncedJsonTree = new SyncedJsonTree();

        this._syncedJsonTree.events.on(`change`, (change, isLocal) => {

            if (isLocal) {

                const pushInterval = Interval.set(async () => {

                    try {

                        await fetch(serverApiPaths.syncedStateChanges, {

                            body: JSON.stringify(change),

                            headers: {[`Content-Type`]: `application/json`},

                            method: `POST`,

                        });

                    } catch (error) {

                        if (IsDev()) {

                            console.error(error);

                        }

                        return;

                    }

                    pushInterval.destroy();

                }, changeDelay, true);

                for (const leafChange of Change.Leaves(change)) {

                    this.events.emit(`leafChange`, leafChange)

                }

            }

        });

        this._syncedJsonTree.events.on(`change`, async (change, isLocal) => {

            if (!isLocal) {

                for (const leafChange of Change.Leaves(change)) {

                    eventually(

                        () => this.events.emit(`leafChange`, leafChange)

                        );

                }                

            }

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

                    this._syncedJsonTree.receive(c, false);

                    this._serverLocalVersion = c.localVersion;

                });

            }

        }, changeDelay, true);

    }

    write (localChange) {

        this._syncedJsonTree.write(localChange, true);

    }

    };

const syncedState = new SyncedState();

module.exports = syncedState;
