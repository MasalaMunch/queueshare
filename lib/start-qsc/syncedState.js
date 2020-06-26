"use strict";

const Delay = require(`../delay`);
const EventEmitter = require(`events`);
const eventually = require(`../eventually`);
const LocalVersion = require(`../local-version`);
const SyncedJsonTree = require(`../synced-json-tree`);
const querystring = require(`querystring`);
const reliablyFetch = require(`../reliably-fetch`);
const reliablyFetchJson = require(`../reliably-fetch-json`);
const safelyFetchJson = require(`../safely-fetch-json`);

const serverApiPaths = require(`../qss-api-paths`);
const ServerPid = require(`./ServerPid.js`);

const SyncedState = class {

    constructor () {

        this.events = new EventEmitter();

        this._serverLocalVersion = LocalVersion.oldest;

        this._serverPid = undefined;

        this._syncedJsonTree = new SyncedJsonTree();

        this._syncedJsonTree.events.on(`change`, (change, isLocal) => {

            if (isLocal) {

                reliablyFetch(serverApiPaths.syncedStateChanges, {

                    body: JSON.stringify(change),

                    headers: {[`Content-Type`]: `application/json`},

                    method: `POST`,

                    timeout: 5 * Delay.oneSecond,

                    });

            }

            this.events.emit(`change`, change);

        });

        ServerPid().then(async (serverPid) => {

            this._serverPid = serverPid;

            const changes = await safelyFetchJson(this._ChangesUrl(`Infinity`));

            for (const c of changes) {

                this._receive(c);

            }

            this.events.emit(`gotInitialChanges`);

            this._startFetchingChanges();

        });

    }

    write (localChange) {

        this._syncedJsonTree.write(localChange, true);

    }

    _ChangesUrl (limit) {

        return (

            serverApiPaths.syncedStateChanges 

            + `?`

            + querystring.stringify({

                pid: this._serverPid, 

                localVersion: this._serverLocalVersion,

                limit,

                })

            );

    }

    _receive (changeFromServer) {

        this._syncedJsonTree.receive(changeFromServer, false);

        const {localVersion} = changeFromServer;

        if (this._serverLocalVersion < localVersion) {

            this._serverLocalVersion = localVersion;

        }

    }

    _startFetchingChanges () {

        (async () => {

            const changes = await reliablyFetchJson(

                this._ChangesUrl(100),

                {timeout: 5 * Delay.oneSecond},

                );

            for (const c of changes) {

                await eventually(() => this._receive(c));

            }

            this._startFetchingChanges();

        })();

    }

    };

const syncedState = new SyncedState();

module.exports = syncedState;
