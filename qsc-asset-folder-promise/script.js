"use strict";

const Elm = require(`../elm`);

const syncedState = require(`../synced-qsc-state`);

window.ss = syncedState;

const contentElm = Elm(`pre`, {className: `content`, childNodes: [Elm(`code`)]});

document.body.appendChild(contentElm);

const fabElm = Elm(`div`, {className: `fab`, childNodes: [Elm(`button`)]});

document.body.appendChild(fabElm);

syncedState._syncedJsonTree.events.on(`change`, (c) => {

    contentElm.querySelector(`code`).appendChild(

        document.createTextNode(JSON.stringify(c, undefined, 4) + `\n\n`

        ));

});
