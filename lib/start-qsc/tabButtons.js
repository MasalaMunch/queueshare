"use strict";

const Elm = require(`../elm`);

const CurrentTab = require(`./CurrentTab.js`);
const Tab = require(`./Tab.js`);

const tabIconSrcs = {

    playlists: `clientAssets/icons/list.svg`,

    queue: `clientAssets/icons/mediaStack.svg`,

    recents: `clientAssets/icons/clock.svg`,

    settings: `clientAssets/icons/gear.svg`,

    uploads: `clientAssets/icons/upload.svg`,

    };

const tabNames = {

    playlists: `Playlists`,

    queue: `Queue`,

    recents: `Recently Played`,

    settings: `Settings`,

    uploads: `Uploads`,

    };

const tabButtons = {};

for (const tab of Tab.all) {

    tabButtons[tab] = Elm(`button`, {

        ariaLabel: tab,

        type: `button`,

        onclick: () => CurrentTab.set(tab),

        childNodes: [

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
