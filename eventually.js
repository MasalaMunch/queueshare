"use strict";

module.exports = (func) => new Promise((resolve, reject) => {

    setTimeout(async () => {

        let output, wasRejected;

        try {

            output = await func();

            wasRejected = false;
            
        } catch (error) {

            reject(error);

            wasRejected = true;

        }

        if (!wasRejected) {

            resolve(output);

        }

    }, 0);

});