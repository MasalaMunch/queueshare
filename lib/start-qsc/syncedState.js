"use strict";

const Delay = require(`../delay`);
const eventually = require(`../eventually`);
const SafeEventEmitter = require(`../safe-event-emitter`);
const SyncedJsonTree = require(`../synced-json-tree`);
const querystring = require(`querystring`);
const reliablyFetch = require(`../reliably-fetch`);
const reliablyFetchJson = require(`../reliably-fetch-json`);

const htmlData = require(`./htmlData.js`);

const eventuallyRestart = () => location.reload();

const {LocalVersion} = SyncedJsonTree;

const SyncedState = class {

    constructor () {

        this.events = new SafeEventEmitter();

        this._initialChanges = JSON.parse(htmlData.syncedStateChangesString);

        this._serverLocalVersion = LocalVersion.oldest;

        this._serverPid = htmlData.serverPid;

        this._syncedJsonTree = new SyncedJsonTree();

        this._syncedJsonTree.events.on(`change`, (change, isLocal) => {

            if (isLocal) {

                reliablyFetch(`/syncedState/changes`, {

                    body: JSON.stringify(change),

                    headers: {[`Content-Type`]: `application/json`},

                    method: `POST`,

                    timeout: Delay.oneSecond,

                    });

            }

            this.events.emit(`change`, change);

        });

        this.events.once(`hasStartedEmitting`, () => {

            this._syncedJsonTree.events.startEmitting();

            for (const c of this._initialChanges) {

                this._receive(c);

            }

            this._initialChanges = undefined;

            this._startPollingChanges();

        });

    }

    write (localChange) {

        this._syncedJsonTree.write(localChange, true);

    }

    _receive (changeFromServer) {

        this._syncedJsonTree.receive(changeFromServer, false);

        const {localVersion} = changeFromServer;

        if (this._serverLocalVersion < localVersion) {

            this._serverLocalVersion = localVersion;

        }

    }

    _startPollingChanges () {

        setTimeout(async () => {

            const changesUrl = (

                `/syncedState/changes?` 

                + querystring.stringify({

                    pid: this._serverPid, 

                    localVersion: this._serverLocalVersion,

                    limit: 100,

                    })

                );

            const changes = await reliablyFetchJson(

                changesUrl,

                {timeout: 5 * Delay.oneSecond},

                );

            if (changes === null) {

                eventuallyRestart();

            }
            else {

                for (const c of changes) {

                    await eventually(() => this._receive(c));

                }

                this._startPollingChanges();

            }

        }, Delay.oneSecond);

    }

    };

const syncedState = new SyncedState();

module.exports = syncedState;
