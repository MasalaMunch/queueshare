"use strict";

const assert = require(`assert`);

const Delay = {

    oneSecond: 1000,

    Valid (delay) {

        assert(typeof delay === `number`);

        assert(delay >= 0);

        assert(delay <= 2147483647);            

        //^ https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout#Syntax
        //  https://nodejs.org/api/timers.html#timers_settimeout_callback_delay_args

        return delay;

    },

    };

Delay.oneHour = Delay.oneSecond * 60 * 60;

module.exports = Delay;
