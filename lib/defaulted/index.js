"use strict";

const OwnProps = require(`../own-props`);

const Defaulted = (target, source) => {

    const defaulted = {...target};

    for (const prop of OwnProps(source)) {

        if (defaulted[prop] === undefined) {

            defaulted[prop] = source[prop];            

        }

    }

    return defaulted;

};

module.exports = Defaulted;
