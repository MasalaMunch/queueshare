"use strict";

const Elm = require(`../elm`);

const eventuallyRestart = require(`./eventuallyRestart.js`);
const Theme = require(`./Theme.js`);
const syncedState = require(`./syncedState.js`);
const ServerPid = require(`./ServerPid.js`);

const start = () => {

    ServerPid.events.once(`change`, () => {

        ServerPid.events.on(`change`, eventuallyRestart)

    });

    const fabElm = Elm(`div`, {className: `fab`, childNodes: [Elm(`button`)]});

    document.body.appendChild(fabElm);

    Theme.events.on(`change`, (theme) => document.body.dataset.theme = theme);

    window.Theme = Theme;

    const contentElm = Elm(`pre`, {className: `content`});

    syncedState.events.on(`change`, (c) => {

        contentElm.appendChild(

            Elm(`code`, {innerText: JSON.stringify(c, undefined, 4) + `\n\n`})

            );

    });

    syncedState.events.once(`gotInitialChanges`, () => {

        document.body.appendChild(contentElm);

    });

    window.syncedState = syncedState;

};

module.exports = start;
