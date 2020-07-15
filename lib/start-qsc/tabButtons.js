"use strict";

const Elm = require(`../elm`);

const CurrentTab = require(`./CurrentTab.js`);
const Tab = require(`./Tab.js`);

const tabIconSrcs = {

    favorites: `clientAssets/icons/favorite.svg`,

    playlists: `clientAssets/icons/list.svg`,

    queue: `clientAssets/icons/mediaStack.svg`,

    recents: `clientAssets/icons/clock.svg`,

    settings: `clientAssets/icons/gear.svg`,

    uploads: `clientAssets/icons/upload.svg`,

    };

const tabNames = {

    favorites: `Favorites`,

    playlists: `Playlists`,

    queue: `Queue`,

    recents: `Recents`,

    settings: `Settings`,

    uploads: `Uploads`,

    };

const tabButtons = {};

for (const tab of Tab.all) {

    tabButtons[tab] = Elm(`button`, {

        type: `button`,

        onclick: () => CurrentTab.set(tab),

        childNodes: [

            Elm(`img`, {

                ariaHidden: true,

                className: `icon`,

                src: tabIconSrcs[tab],

                }),

            Elm(`span`, {

                className: `name`, 

                innerText: tabNames[tab], 

                }),

            ],

        });

}

module.exports = tabButtons;
