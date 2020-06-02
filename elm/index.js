"use strict";

const extend = require(`../extend`);
const OwnProps = require(`../own-props`);

const Elm = (tagName, props) => {

    const elm = document.createElement(tagName);

    const newProps = {};

    for (const p of OwnProps(props)) {

        if (p === `childNodes`) {

            for (const n of props.childNodes) {

                elm.appendChild(n);

            }

        }
        else if (p === `classList`) {

            for (const c of props.classList) {

                elm.classList.add(c);

            }

        }
        else if (p === `innerText`) {

            elm.innerText = props.innerText;

        }
        else if (typeof props[p] === `function`) {

            newProps[p] = props[p].bind(elm);

        }
        else {

            newProps[p] = props[p];

        }

    }

    extend(elm, newProps);

    return elm;

};

module.exports = Elm;
