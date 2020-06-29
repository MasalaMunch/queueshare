"use strict";

const JsonOrUndefined = (something) => {

    let jsonOrUndefined;

    if (typeof something === `string`) {

        try {

            jsonOrUndefined = JSON.parse(something);

        } catch (error) {

        }

    }

    return jsonOrUndefined;

};

module.exports = JsonOrUndefined;
