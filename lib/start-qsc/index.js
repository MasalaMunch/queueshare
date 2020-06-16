"use strict";

const Elm = require(`../elm`);

const syncedState = require(`./syncedState.js`);

const start = () => {

    window.ss = syncedState;

    const contentElm = Elm(`pre`, {className: `content`});

    document.body.appendChild(contentElm);

    const fabElm = Elm(`div`, {className: `fab`, childNodes: [Elm(`button`)]});

    document.body.appendChild(fabElm);

    syncedState._syncedJsonTree.events.on(`change`, (c) => {

        contentElm.appendChild(

            Elm(`code`, {innerText: JSON.stringify(c, undefined, 4) + `\n\n`})

            );

    });

};

module.exports = start;
