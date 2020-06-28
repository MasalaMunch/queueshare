"use strict";

const Elm = require(`../elm`);

const Theme = require(`./Theme.js`);
const syncedState = require(`./syncedState.js`);

const start = () => {

    const fabElm = Elm(`div`, {className: `fab`, childNodes: [Elm(`button`)]});

    document.body.appendChild(fabElm);

    Theme.events.on(`change`, (theme) => document.body.dataset.theme = theme);

    window.Theme = Theme;

    const contentElm = Elm(`pre`, {className: `content`});

    let i = 0;

    syncedState.events.on(`change`, (c) => {

        console.log(i++);

        contentElm.appendChild(

            Elm(`code`, {innerText: JSON.stringify(c, undefined, 4) + `\n\n`})

            );

    });

    syncedState.events.once(`gotInitialChanges`, () => {

        document.body.appendChild(contentElm);

    });

    fabElm.querySelector(`button`).onclick = () => syncedState.write({path: []});

    window.syncedState = syncedState;

};

module.exports = start;
