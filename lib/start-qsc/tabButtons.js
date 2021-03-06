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

        onclick: () => CurrentTab.set(tab),

        type: `button`,

        childNodes: [

            Elm(`div`, {

                ariaHidden: true,

                className: `swipe-indicator`,

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

CurrentTab.events.on(`change`, (newTab, oldTab) => {

    if (oldTab !== undefined) {

        tabButtons[oldTab].classList.remove(`current`);

    }

    tabButtons[newTab].classList.add(`current`);

});

module.exports = tabButtons;
