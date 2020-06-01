"use strict";

const extend = require(`../extend`);
const Mapped = require(`../mapped`);

const Dom = (tagName, props) => {

    const dom = document.createElement(tagName);

    props = {...props};

    if (props.innerText !== undefined) {

        dom.innerText = props.innerText;

    }

    delete props.innerText;

    if (props.childNodes !== undefined) {

        for (const n of props.childNodes) {

            dom.appendChild(n);

        }

    }

    delete props.childNodes;

    if (props.classList !== undefined) {

        for (const c of props.classList) {

            dom.classList.add(c);

        }

    }

    delete props.classList;

    extend(dom, Mapped(props, (p) => typeof p === `function`? p.bind(dom) : p));

    return dom;

};

module.exports = Dom;
