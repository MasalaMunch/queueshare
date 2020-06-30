"use strict";

const Elm = require(`../elm`);

const Theme = require(`./Theme.js`);
const syncedState = require(`./syncedState.js`);

const start = () => {

    const fabElm = Elm(`div`, {

        className: `fab`, 

        childNodes: [Elm(`button`, {aria: {label: `quick actions`}})],

        });

    document.body.appendChild(fabElm);

    Theme.events.on(`change`, (theme) => document.body.dataset.theme = theme);

    window.Theme = Theme;

    const contentElm = Elm(`div`, {className: `content`});

    const changeLogElm1 = Elm(`div`);

    const changeLogElm2 = Elm(`div`);

    const changeLogElm3 = Elm(`div`);

    window.contentElm = contentElm;

    contentElm.appendChild(changeLogElm1);

    contentElm.appendChild(changeLogElm2);

    contentElm.appendChild(changeLogElm3);

    const ChangeElm = (change) => Elm(`p`, {innerText: change.value});

    syncedState.events.on(`change`, (c) => {

        changeLogElm1.appendChild(ChangeElm(c));

        if (Math.random() < 0.75) {

            changeLogElm2.appendChild(ChangeElm(c));       

        }

        if (Math.random() < 0.25) {

            changeLogElm3.appendChild(ChangeElm(c));        

        }

    });

    syncedState.events.once(`gotInitialChanges`, () => {

        document.body.appendChild(contentElm);

    });

    fabElm.querySelector(`button`).onclick = () => syncedState.write({path: [], value: new Date()});

    window.syncedState = syncedState;

};

module.exports = start;
