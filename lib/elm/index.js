"use strict";

const doNothing = require(`../do-nothing`);
const OwnProps = require(`../own-props`);

const nestedProps = new Set([`dataset`, `style`]);

const rawAttributes = new Set([`placeholder`]);

const Elm = (tagName, props) => {

    const elm = document.createElement(tagName);

    elm.addEventListener(`touchstart`, doNothing, {passive: true});

    //^ https://stackoverflow.com/a/33681490

    for (const p of OwnProps(props)) {

        const v = props[p];

        if (nestedProps.has(p)) {

            Object.assign(elm[p], v);

        }
        else if (rawAttributes.has(p)) {

            elm.setAttribute(p, v);

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

Elm.remove = (elm) => {

    elm.parentNode.removeChild(elm);

};

Elm.fill = (elm, childNodes) => {

    elm.innerHTML = ``;

    elm.append(...childNodes);

};

Elm.clear = (elm) => Elm.fill(elm, []);

module.exports = Elm;
