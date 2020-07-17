"use strict";

const assert = require(`assert`);
const Elm = require(`../elm`);

const CurrentTab = require(`./CurrentTab.js`);
const header = require(`./header.js`);
const tabButtons = require(`./tabButtons.js`);
    
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

    Elm.on(window, `touchstart`, (e) => {

        clearSwipeIndicator();

        if (!header.contains(e.target) && e.touches.length === 1) {

            swipeStart = e;

        }
        else {

            swipeStart = undefined;

        }

    }, {passive: true});

    Elm.on(window, `touchcancel`, () => {

        clearSwipeIndicator();

        swipeStart = undefined;

    }, {passive: true});

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

    Elm.on(window, `touchmove`, (e) => {

        clearSwipeIndicator();

        const swipeTab = SwipeTab(e);

        if (swipeTab !== undefined) {

            const button = tabButtons[swipeTab];

            swipeIndicator = button.querySelector(`.swipe-indicator`);

            swipeIndicator.classList.add(`current`);

            if (!Elm.IsFullyVisible(button)) {

                button.scrollIntoView();

            }

        }

    }, {passive: true});

    Elm.on(window, `touchend`, (e) => {

        clearSwipeIndicator();

        const swipeTab = SwipeTab(e);

        if (swipeTab !== undefined) {

            CurrentTab.set(swipeTab);

        }

        swipeStart = undefined;

    }, {passive: true});

    hasEnabledTabSwiping = true;

};

module.exports = enableTabSwiping;
