"use strict";

const OwnProps = function* (something) {

    for (const prop in something) {

        if (something.hasOwnProperty(prop)) {

            yield prop;

        }

    }

};

module.exports = OwnProps;
