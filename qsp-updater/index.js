"use strict";

const execa = require(`execa`);
const fs = require(`fs`);
const path = require(`path`);
const stringFileEncoding = require(`../string-file-encoding`);

const file = require(`../qsp-file`);
const folder = require(`../qsp-folder`);

const JsonPromise = async () => {

    return JSON.parse(

        await fs.promises.readFile(file, {encoding: stringFileEncoding})

        );

};

const parentPackageFolder = path.resolve(folder, `..`, `..`);

const updater = {
    
    hasUpdated: false,

    tryUpdating: async () => {

        const {name, version} = await JsonPromise();

        await execa(`npm`, [`update`, name], {cwd: parentPackageFolder});

        if (!updater.hasUpdated) {

            updater.hasUpdated = version !== (await JsonPromise()).version;

        }

    },

    };

module.exports = updater;
