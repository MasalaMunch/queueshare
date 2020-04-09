"use strict";

module.exports = (func) => new Promise((resolve, reject) => {

    setTimeout(() => {

        try {

            resolve(func());
            
        } catch (error) {

            reject(error);

        }

    }, 0);

});