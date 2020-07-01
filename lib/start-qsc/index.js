"use strict";

const fab = require(`./fab.js`);
const Tab = require(`./Tab.js`);
const tabContents = require(`./tabContents.js`);
const Theme = require(`./Theme.js`);

const start = () => {

    Object.assign(window, {Tab, Theme});

    let content;

    Tab.events.on(`change`, (newTab) => {

        const newContent = tabContents[newTab];

        if (content === undefined) {

            document.body.appendChild(newContent);

        }
        else {

            document.body.replaceChild(newContent, content);

        }

        document.body.appendChild(fab);

        content = newContent;

    });

    Theme.events.on(`change`, (theme) => document.body.dataset.theme = theme);

};

module.exports = start;
