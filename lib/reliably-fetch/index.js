"use strict";

const assert = require(`assert`);
const Delay = require(`../delay`);
const safelyFetch = require(`../safely-fetch`);

const {ResponseError} = safelyFetch;

const reliablyFetch = (resource, init) => new Promise((resolve, reject) => {

    const networkErrorDelay = (

        init.networkErrorDelay === undefined? 

        Delay.oneSecond : Delay.Valid(init.networkErrorDelay)

        );

    const timeout = Delay.Valid(init.timeout);

    let isDone = false;

    const start = () => {

        let hasRestarted = false;

        const restartIfNecessary = () => {

            if (!isDone && !hasRestarted) {

                start();

                hasRestarted = true;                        

            }            

        };

        if (timeout !== undefined) {

            setTimeout(restartIfNecessary, timeout);

        }

        safelyFetch(resource, init).then(

            (response) => {

                if (!isDone) {

                    isDone = true;

                    resolve(response);

                }

            },

            (error) => {

                if (error instanceof ResponseError) {

                    if (!isDone) {

                        isDone = true;

                        reject(error);                        

                    }

                }
                else {

                    setTimeout(restartIfNecessary, networkErrorDelay);

                }

            },

            );

    };

    start();

});

module.exports = reliablyFetch;
