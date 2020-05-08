"use strict";

const exitProcess = require(`./exitProcess.js`); 
const processMessages = require(`./processMessages.js`);

module.exports = (npmCommand) => {

    //TODO periodically run npm update and send restartCommand if package-lock changes

    process.on(`message`, (message) => {

        if (message === processMessages.restartConfirmation) {

            exitProcess();

        }

    });

};
