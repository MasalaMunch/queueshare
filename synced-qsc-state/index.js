"use strict";

const eventually = require(`../eventually`);
const Interval = require(`../interval`);
const JsonFetch = require(`../json-fetch`);
const SyncedJsonTree = require(`../synced-json-tree`);
const querystring = require(`querystring`);

const changeDelay = require(`../qsc-change-delay`);
const IsDev = require(`../qsc-is-dev`);
const serverApiPaths = require(`../qss-api-paths`);

const SyncedState = class {

    constructor () {

        this._serverLocalVersion = undefined;

        this._syncedJsonTree = new SyncedJsonTree();

        this._syncedJsonTree.events.on(`change`, (change) => {

            console.log(change);

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

    }

    write (localChange) {

        const {change} = this._syncedJsonTree.write(localChange);

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

    }

    };

module.exports = SyncedState;
