"use strict";

const doNothing = require(`../do-nothing`);
const OwnProps = require(`../own-props`);

const Elm = (tagName, props) => {

    const elm = document.createElement(tagName);

    elm.addEventListener(`touchstart`, doNothing, {passive: true});

    //^ https://stackoverflow.com/a/33681490

    for (const p of OwnProps(props)) {

        const v = props[p];

        if (p === `childNodes`) {

            elm.append(...v);

        }
        else if (p === `classList`) {

            elm.classList.add(...v);

        }
        else if ([`placeholder`].includes(p)) {

            elm.setAttribute(p, v);

        }
        else {

            elm[p] = v;

        }

    }

    return elm;

};

module.exports = Elm;
