"use strict";

const Delay = require(`../delay`);
const eventually = require(`../eventually`);
const SafeEventEmitter = require(`../safe-event-emitter`);
const SyncedJsonTree = require(`../synced-json-tree`);
const querystring = require(`querystring`);
const reliablyFetch = require(`../reliably-fetch`);
const reliablyFetchJson = require(`../reliably-fetch-json`);

const htmlData = require(`./htmlData.js`);

const syncedJsonTree = new SyncedJsonTree();

const syncedState = {

    events: new SafeEventEmitter(),

    write: (localChange) => {

        syncedJsonTree.write(localChange, true);

    },

    };

syncedJsonTree.events.on(`change`, (change, isLocal) => {

    if (isLocal) {

        reliablyFetch(`/syncedState/changes`, {

            body: JSON.stringify(change),

            headers: {[`Content-Type`]: `application/json`},

            method: `POST`,

            timeout: Delay.oneSecond,

            });

    }

    syncedState.events.emit(`change`, change);

});

let serverLocalVersion = SyncedJsonTree.LocalVersion.oldest;

const receive = (changeFromServer) => {

    syncedJsonTree.receive(changeFromServer, false);

    const {localVersion} = changeFromServer;

    if (serverLocalVersion < localVersion) {

        serverLocalVersion = localVersion;

    }

};

const {serverPid} = htmlData;

const eventuallyRestart = () => location.reload();

const startPollingChanges = () => {

    setTimeout(async () => {

        const changesUrl = (

            `/syncedState/changes?` 

            + querystring.stringify({

                pid: serverPid, 

                localVersion: serverLocalVersion,

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

                await eventually(() => receive(c));

            }

            startPollingChanges();

        }

    }, Delay.oneSecond);

};

syncedState.events.once(`hasStarted`, () => {

    syncedJsonTree.events.start();

    for (const c of JSON.parse(htmlData.syncedStateChangesString)) {

        receive(c);

    }

    startPollingChanges();

});

module.exports = syncedState;
