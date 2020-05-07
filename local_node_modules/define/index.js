"use strict";

module.exports = (target, ...sources) => {

    for (const s of sources) {

        for (const key in s) {

            if (s.hasOwnProperty(key)) {

                if (target[key] === undefined) {

                    target[key] = s[key];                    

                }

            }


        }

    }

    return target;

};