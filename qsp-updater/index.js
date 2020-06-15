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

const Updater = class {

    constructor () {

        this.hasUpdated = false;

    }

    async tryUpdating () {

        const {name, version} = await JsonPromise();

        await execa(`npm`, [`update`, name], {cwd: parentPackageFolder});

        if (!this.hasUpdated) {

            this.hasUpdated = version !== (await JsonPromise()).version;

        }

    } 

    };

const updater = new Updater();

module.exports = updater;
