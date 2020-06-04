"use strict";

const execa = require(`execa`);
const path = require(`path`);

const folder = require(`../qsp-folder`);
const JsonPromise = require(`../qsp-json-promise`);
const VersionPromise = require(`../qsp-version-promise`);

const parentPackageFolder = path.resolve(folder, `..`, `..`);

const updater = {
    
    hasUpdated: false,

    try: async () => {

        const version = await VersionPromise();

        await execa(

            `npm`, 

            [`update`, (await JsonPromise()).name], 

            {cwd: parentPackageFolder},

            );

        const newVersion = await VersionPromise();

        updater.hasUpdated = updater.hasUpdated || (version !== newVersion);

    },

    };

module.exports = updater;
