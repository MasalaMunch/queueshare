"use strict";

const EventEmitter = require(`events`);
const eventually = require(`../eventually`);
const JsonFetch = require(`../json-fetch`);
const LocalVersion = require(`../local-version`);
const SyncedJsonTree = require(`../synced-json-tree`);
const querystring = require(`querystring`);

const badServerPidMsg = require(`../bad-qss-pid-msg`);
const eventuallyRestart = require(`./eventuallyRestart.js`);
const logNetworkError = require(`./logNetworkError.js`);
const networkErrorDelay = require(`./networkErrorDelay.js`);
const serverApiPaths = require(`../qss-api-paths`);

const SyncedState = class {

    constructor () {

        this.events = new EventEmitter();

        this._startFetchingChanges();

        this._syncedJsonTree.events.on(`change`, (change, isLocal) => {

            this.events.emit(`change`, change);

            if (isLocal) {

                this._eventuallySend(change);

            }

        });

    }

    write (localChange) {

        this._syncedJsonTree.write(localChange, true);

    }

    _eventuallySend (change) {

        (async () => {

            try {

                await fetch(serverApiPaths.syncedStateChanges, {

                    body: JSON.stringify(change),

                    headers: {[`Content-Type`]: `application/json`},

                    method: `POST`,

                    });

            } catch (error) {

                logNetworkError(error);

                setTimeout(

                    () => this._eventuallySend(change), 

                    networkErrorDelay,

                    );

                return;

            }

        })();

    }

    _receive (fetchedChange) {

        this._syncedJsonTree.receive(fetchedChange, false);

    }

    async _startFetchingChanges (_query = undefined, _hasFetched = false) {

        const repeat = () => this._startFetchingChanges(_query, _hasFetched);

        if (_query === undefined) {

            let pid;

            try {

                pid = await JsonFetch(serverApiPaths.pid);

            } catch (error) {

                logNetworkError(error);

                setTimeout(repeat, networkErrorDelay);

                return;

            }

            _query = (

                {pid, localVersion: LocalVersion.oldest, limit: `Infinity`}

                );

        }

        const changesUrl = (

            serverApiPaths.syncedStateChanges 

            + `?` 

            + querystring.stringify(_query)

            );

        try {

            changes = await JsonFetch(changesUrl);

        } catch (error) {

            logNetworkError(error);

            setTimeout(repeat, networkErrorDelay);

            return;

        }

        if (changes === badServerPidMsg) {

            eventuallyRestart();

        }
        else {

            if (_hasFetched) {

                for (const c of changes) {

                    await eventually(() => this._receive(c));

                }

            }
            else {

                for (const c of changes) {

                    this._receive(c);

                }

                _hasFetched = true;

                this.events.emit(`hasFetchedChanges`);

            }

            _query = {

                pid: _query.pid,

                localVersion: (

                    changes.length > 0? 

                    changes[changes.length-1].localVersion : _query.localVersion 

                    ),

                limit: 100,

                };

            setTimeout(repeat, 250);

        }

    }

    };

const syncedState = new SyncedState();

module.exports = syncedState;
