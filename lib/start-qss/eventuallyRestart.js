"use strict";

process.on(`message`, (message) => {

    if (message === `restartReceived`) {

        process.exit();

    }

});

const eventuallyRestart = () => {

    process.send(`restart`);

};

module.exports = eventuallyRestart;
