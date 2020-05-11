"use strict";

const fs = require(`fs`);

const beforeExiting = require(`signal-exit`);
const crash = require(`./crash.js`);
const log = require(`../log-to-queueshare`);
const Paths = require(`../queueshare-paths`);

module.exports = (dir) => {

    const lockFilePath = Paths(dir).lock;

    try {
        
        fs.writeFileSync(lockFilePath, ``, {flag: `wx`});

    } catch (error) {

        if (error.code === `EEXIST`) {

            log(
                `It looks like there's already a queueshare process serving`
                + ` "${dir}". Multiple processes serving the same data can`
                + ` cause errors and data corruption, so this process will be` 
                + ` terminated. If you're certain that there are no other`
                + ` processes serving this data, delete "${lockFilePath}" and`
                + ` try again.`
                );

            crash();

        }
        else {

            throw error;

        }

    }

    beforeExiting(() => fs.unlinkSync(lockFilePath));

};