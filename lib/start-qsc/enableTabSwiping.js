"use strict";

const assert = require(`assert`);
const Elm = require(`../elm`);
const OwnProps = require(`../own-props`);

const CurrentTab = require(`./CurrentTab.js`);
const Tab = require(`./Tab.js`);
const tabButtons = require(`./tabButtons.js`);
const tabMains = require(`./tabMains.js`);

let hasEnabledTabSwiping = false;

const enableTabSwiping = () => {

    assert(!hasEnabledTabSwiping);

    let swipeIndicator;

    const clearSwipeIndicator = () => {

        if (swipeIndicator !== undefined) {

            swipeIndicator.classList.remove(`current`);

        }

    };

    let swipeStart;

    const SwipeTab = (touchMoveOrEndEvent) => {

        let swipeTab;

        if (swipeStart !== undefined) {

            const startTouch = swipeStart.touches[0];

            const endTouch = touchMoveOrEndEvent.changedTouches[0];

            const x = endTouch.screenX - startTouch.screenX;

            if (Math.abs(x) > 75) {

                if (x > 0) {

                    if (!CurrentTab.IsFirst()) {

                        swipeTab = CurrentTab.Previous();

                    }

                }
                else {

                    if (!CurrentTab.IsLast()) {

                        swipeTab = CurrentTab.Next();

                    }

                }

            }

        }

        return swipeTab;

    };

    const eventPassiveHandlers = {

        touchcancel: () => {

            clearSwipeIndicator();

            swipeStart = undefined;

        },

        touchend: (e) => {

            clearSwipeIndicator();

            const swipeTab = SwipeTab(e);

            if (swipeTab !== undefined) {

                CurrentTab.set(swipeTab);

            }

            swipeStart = undefined;

        },

        touchmove: (e) => {

            clearSwipeIndicator();

            const swipeTab = SwipeTab(e);

            let button;

            if (swipeTab === undefined) {

                button = tabButtons[CurrentTab()];

            }
            else {

                button = tabButtons[swipeTab];

                swipeIndicator = button.querySelector(`.swipe-indicator`);

                swipeIndicator.classList.add(`current`);

            }

            button.scrollIntoView();

        },

        touchstart: (e) => {

            clearSwipeIndicator();

            swipeStart = e.touches.length === 1? e : undefined;

        },

        };

    for (const tab of Tab.all) {

        for (const event of OwnProps(eventPassiveHandlers)) {

            Elm.on(

                tabMains[tab], 

                event, 

                eventPassiveHandlers[event], 

                {passive: true},

                );

        }

    }

    hasEnabledTabSwiping = true;

};

module.exports = enableTabSwiping;
