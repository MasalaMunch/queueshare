"use strict";

const OwnProps = require(`../own-props`);

const doNothing = () => {};

const Elm = (tagName, props) => {

    const elm = document.createElement(tagName);

    elm.addEventListener(`touchstart`, doNothing, {passive: true});

    //^ https://stackoverflow.com/a/33681490

    for (const p of OwnProps(props)) {

        const v = props[p];

        if (p === `aria`) {

            for (const p of OwnProps(v)) {

                elm.setAttribute(`aria-${p}`, v[p]);

            }

        }
        else if (p === `childNodes`) {

            for (const n of v) {

                elm.appendChild(n);

            }

        }
        else if (p === `classList`) {

            for (const c of v) {

                elm.classList.add(c);

            }

        }
        else {

            if (typeof v === `function`) {

                v = v.bind(elm);

            }

            elm[p] = v;

        }

    }

    return elm;

};

module.exports = Elm;
