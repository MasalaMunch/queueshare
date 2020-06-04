"use strict";

const Defaultified = require(`../defaultified`);
const extend = require(`../extend`);
const Filtered = require(`../filtered`);
const Mapped = require(`../mapped`)

const defaultProps = {

    innerText: ``,

    childNodes: [],

    classList: [],

    };

const Elm = (tagName, props) => {

    const elm = document.createElement(tagName);

    props = Defaultified(props, defaultProps);

    elm.innerText = props.innerText;

    for (const n of props.childNodes) {

        elm.appendChild(n);

    }

    for (const c of props.classList) {

        elm.classList.add(c);

    }

    const newProps = Filtered(props, (v, p) => !defaultProps.hasOwnProperty(p));

    const BoundToElm = (v) => typeof v === `function`? v.bind(elm) : v;

    extend(elm, Mapped(newProps, BoundToElm));

    return elm;

};

module.exports = Elm;