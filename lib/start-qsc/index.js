"use strict";

const Elm = require(`../elm`);

const syncedState = require(`./syncedState.js`);
const Theme = require(`./Theme.js`);

const start = () => {

    const contentElm = Elm(`pre`, {className: `content`});

    document.body.appendChild(contentElm);

    const fabElm = Elm(`div`, {className: `fab`, childNodes: [Elm(`button`)]});

    document.body.appendChild(fabElm);

    syncedState._syncedJsonTree.events.on(`change`, (c) => {

        contentElm.appendChild(

            Elm(`code`, {innerText: JSON.stringify(c, undefined, 4) + `\n\n`})

            );

    });

    window.syncedState = syncedState;

    Theme.events.on(`change`, (theme) => document.body.dataset.theme = theme);

    window.Theme = Theme;

};

module.exports = start;
