"use strict";

const OwnProps = require(`../own-props`);

const Defined = (target, source) => {

    const defined = {...target};

    for (const prop of OwnProps(source)) {

        if (defined[prop] === undefined) {

            defined[prop] = source[prop];            

        }

    }

    return defined;

};

module.exports = Defined;
