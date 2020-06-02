"use strict";

const OwnProps = require(`../own-props`);

const Defaultified = (target, source) => {

    const defaultified = {...target};

    for (const prop of OwnProps(source)) {

        if (defaultified[prop] === undefined) {

            defaultified[prop] = source[prop];            

        }

    }

    return defaultified;

};

module.exports = Defaultified;
