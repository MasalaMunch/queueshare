"use strict";

const assert = require(`assert`);
const Defaulted = require(`../defaulted`);
const Delay = require(`../delay`);
const safelyFetch = require(`../safely-fetch`);

const {ResponseError} = safelyFetch;

const reliablyFetch = (resource, init) => new Promise((resolve, reject) => {

    let {timeout, networkErrorDelay} = Defaulted(init, {

        networkErrorDelay: Delay.oneSecond,

        });

    if (timeout !== undefined) {

        timeout = Delay.Valid(timeout);

    }

    networkErrorDelay = Delay.Valid(networkErrorDelay);

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
