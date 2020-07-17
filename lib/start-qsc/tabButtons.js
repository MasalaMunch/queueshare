"use strict";

const Elm = require(`../elm`);

const CurrentTab = require(`./CurrentTab.js`);
const Tab = require(`./Tab.js`);
const tabNames = require(`./tabNames.js`);

const tabIconSrcs = {

    favorites: `/clientAssets/icons/favorite.svg`,

    playlists: `/clientAssets/icons/list.svg`,

    queue: `/clientAssets/icons/mediaStack.svg`,

    recents: `/clientAssets/icons/clock.svg`,

    settings: `/clientAssets/icons/gear.svg`,

    uploads: `/clientAssets/icons/upload.svg`,

    };

const tabButtons = {};

for (const tab of Tab.all) {

    tabButtons[tab] = Elm(`button`, {

        ariaLabel: tabNames[tab],

        type: `button`,

        onclick: () => CurrentTab.set(tab),

        childNodes: [

            Elm(`div`, {

                ariaHidden: true,

                className: `swipe-indicator`,

                style: {opacity: `0.0`},

                }),

            Elm(`img`, {

                ariaHidden: true,

                className: `icon`,

                src: tabIconSrcs[tab],

                }),

            Elm(`span`, {

                ariaHidden: true,

                className: `name`, 

                innerText: tabNames[tab], 

                }),

            ],

        });

}

module.exports = tabButtons;
