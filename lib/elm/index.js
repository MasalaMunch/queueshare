"use strict";

const doNothing = require(`../do-nothing`);
const OwnProps = require(`../own-props`);

const attributes = new Set([`placeholder`]);

const nestedProps = new Set([`dataset`, `style`]);

const Elm = (tagName, props) => {

    const elm = document.createElement(tagName);

    elm.addEventListener(`touchstart`, doNothing, {passive: true});

    //^ https://stackoverflow.com/a/33681490

    for (const p of OwnProps(props)) {

        const v = props[p];

        if (attributes.has(p)) {

            elm.setAttribute(p, v);

        }
        else if (nestedProps.has(p)) {

            Object.assign(elm[p], v);

        }
        else if (p === `childNodes`) {

            elm.append(...v);

        }
        else if (p === `classList`) {

            elm.classList.add(...v);

        }
        else if (typeof v === `function`) {

            elm[p] = v.bind(elm);

        }
        else {

            elm[p] = v;

        }

    }

    return elm;

};

Elm.ById = (id) => document.getElementById(id);

Elm.clear = (elm) => {

    while (elm.lastChild !== null) {

        elm.removeChild(elm.lastChild);

    }

};

Elm.remove = (elm) => {

    elm.parentNode.removeChild(elm);

};

module.exports = Elm;
