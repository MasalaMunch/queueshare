"use strict";

const Elm = require(`../elm`);

const keepUpdated = require(`../keep-qsc-updated`);
const syncedState = require(`../synced-qsc-state`);

keepUpdated();

window.ss = syncedState;

const contentElm = Elm(`code`, {className: `content`, childNodes: [Elm(`pre`)]});

document.body.appendChild(contentElm);

const fabElm = Elm(`div`, {className: `fab`, childNodes: [Elm(`button`)]});

document.body.appendChild(fabElm);

syncedState.events.on(`leafChange`, (leafChange) => {

    console.log(leafChange);

    contentElm.querySelector(`pre`).appendChild(document.createTextNode(

        JSON.stringify(leafChange, undefined, 4) + `\n\n`

        ));

});
