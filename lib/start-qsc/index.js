"use strict";

const fab = require(`./fab.js`);
const Tab = require(`./Tab.js`);
const tabContents = require(`./tabContents.js`);
const Theme = require(`./Theme.js`);

const start = () => {

    Object.assign(window, {Tab, Theme});

    let tab;

    Tab.events.on(`change`, (newTab) => {

        if (tab === undefined) {

            document.body.appendChild(tabContents[newTab]);

        }
        else {

            document.body.replaceChild(tabContents[newTab], tabContents[tab]);

        }

        document.body.appendChild(fab);

        tab = newTab;

    });

    Theme.events.on(`change`, (theme) => document.body.dataset.theme = theme);

};

module.exports = start;
