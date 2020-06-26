"use strict";

const processMessages = require(`./processMessages.js`);

process.on(`message`, (message) => {

    if (message === processMessages.restartConfirmation) {

        process.exit();

    }

});

const eventuallyRestart = () => {

    process.send(processMessages.restartCommand);

};

module.exports = eventuallyRestart;
