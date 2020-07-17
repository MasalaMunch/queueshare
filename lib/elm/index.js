"use strict";

const doNothing = require(`../do-nothing`);
const OwnProps = require(`../own-props`);

const nestedProps = new Set([`dataset`, `style`]);

const rawAttributes = new Set([`disabled`]);

const Elm = (tagName, props) => {

    const elm = document.createElement(tagName);

    Elm.on(elm, `touchstart`, doNothing, {passive: true});

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

Elm.clear = (elm) => {

    elm.innerHTML = ``;

};

Elm.fill = (elm, childNodes) => {

    Elm.clear(elm);

    elm.append(...childNodes);

};

Elm.IsFullyVisible = (elm) => {

    const {left, right, top, bottom} = elm.getBoundingClientRect();

    return (

        top >= 0 && bottom <= innerHeight && left >= 0  && right <= innerWidth

        );

};

Elm.off = (elm, ...removeEventListenerArgs) => {

    elm.removeEventListener(...removeEventListenerArgs);

};

Elm.on = (elm, ...addEventListenerArgs) => {

    elm.addEventListener(...addEventListenerArgs);

};

Elm.remove = (elm) => {

    elm.parentNode.removeChild(elm);

};

module.exports = Elm;
