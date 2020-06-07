"use strict";

const OwnProps = require(`../own-props`);

const define = (target, source) => {

    for (const prop of OwnProps(source)) {

        if (target[prop] === undefined) {

            target[prop] = source[prop];            

        }

    }

};

module.exports = define;
