"use strict";

const eventually = require(`../eventually`);
const Interval = require(`../interval`);
const JsonFetch = require(`../json-fetch`);
const LocalVersion = require(`../local-version`);
const SyncedJsonTree = require(`../synced-json-tree`);
const querystring = require(`querystring`);

const changeDelay = require(`../qsc-change-delay`);
const IsDev = require(`../qsc-is-dev`);
const serverApiPaths = require(`../qss-api-paths`);
const serverBadPidStatus = require(`../qss-bad-pid-status`);

const SyncedState = class {

    constructor () {

        this._hasFetchedChanges = false;

        this._serverLocalVersion = LocalVersion.oldest;

        this._syncedJsonTree = new SyncedJsonTree();

        const pidFetchInterval = Interval.set(async () => {

            let serverPid;

            try {

                serverPid = await JsonFetch(serverApiPaths.pid);

            } catch (error) {

                if (IsDev()) {

                    console.error(error);

                }

                return;

            }

            pidFetchInterval.destroy();

            Interval.set(async () => {

                let changes;

                const query = querystring.stringify({

                    localVersion: this._serverLocalVersion,

                    limit: this._hasFetchedChanges? 100 : "Infinity",

                    pid: serverPid,

                    });

                try {

                    changes = await JsonFetch(

                        serverApiPaths.syncedStateChanges + `?` + query

                        );

                } catch (error) {

                    if (error && error.status === serverBadPidStatus) {

                        window.location.reload();

                    }
                    else if (IsDev()) {

                        console.error(error);

                    }

                    return;

                }

                if (this._hasFetchedChanges) {

                    for (const c of changes) {

                        await eventually(() => this._receive(c));

                    }

                }
                else {

                    for (const c of changes) {

                        this._receive(c);

                    }

                    this._hasFetchedChanges = true;

                }

            }, changeDelay, true);

        }, changeDelay, true);

    }

    write (localChange) {

        const {change} = this._syncedJsonTree.write(localChange);

        const sendInterval = Interval.set(async () => {

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

            sendInterval.destroy();

        }, changeDelay, true);

    }

    _receive (serverChange) {

        this._syncedJsonTree.receive(serverChange);

        this._serverLocalVersion = serverChange.localVersion;

    }

    };

const syncedState = new SyncedState();

module.exports = syncedState;
