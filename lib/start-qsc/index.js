"use strict";

const fab = require(`./fab.js`);
const Tab = require(`./Tab.js`);
const tabContents = require(`./tabContents.js`);
const Theme = require(`./Theme.js`);

const start = () => {

    Object.assign(window, {Tab, Theme});

    let contents;

    Tab.events.on(`change`, (newTab) => {

        const newContents = tabContents[newTab];

        if (contents === undefined) {

            document.body.appendChild(newContents);

        }
        else {

            document.body.replaceChild(newContents, contents);

        }

        document.body.appendChild(fab);

        contents = newContents;

    });

    Theme.events.on(`change`, (theme) => document.body.dataset.theme = theme);

};

module.exports = start;
