"use strict";

const beforeProcessExits = require(`./beforeProcessExits.js`);
const crashProcess = require(`./crashProcess.js`);
const fs = require(`fs`);
const log = require(`./log.js`);
const Paths = require(`./Paths.js`);

module.exports = (dir) => {

    const {lockFile} = Paths(dir);

    try {
        
        fs.writeFileSync(lockFile, ``, {flag: `wx`});

    } catch (error) {

        if (error.code === `EEXIST`) {

            log(
                `It looks like there's already a QueueShare process serving`
                + ` "${dir}". Multiple processes serving the same data can`
                + ` cause errors and data corruption, so this process will be` 
                + ` terminated. If you're certain that there are no other`
                + ` processes serving this data, delete "${lockFile}" and try`
                + ` again.`
                );

            crashProcess();

        }
        else {

            throw error;

        }

    }

    beforeProcessExits(() => fs.unlinkSync(lockFile));

};
