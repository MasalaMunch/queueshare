"use strict";

const Delay = require(`../delay`);
const execa = require(`execa`);
const fs = require(`fs`);
const path = require(`path`);
const stringFileEncoding = require(`../string-file-encoding`);

const packageFile = require(`../qsp-file`);
const packageFolder = require(`../qsp-folder`);

const PackageJsonPromise = async () => {

    return JSON.parse(

        await fs.promises.readFile(packageFile, {encoding: stringFileEncoding})

        );

};

const parentPackageFolder = path.resolve(packageFolder, `..`, `..`);

const PackageUpdater = class {

    constructor () {

        this.hasUpdated = false;

        this._timeoutId = undefined;

    }

    async tryUpdating () {

        const {name, version} = await PackageJsonPromise();

        await execa(`npm`, [`update`, name], {cwd: parentPackageFolder});

        if (!this.hasUpdated) {

            this.hasUpdated = version !== (await PackageJsonPromise()).version;

        }

    }

    setInterval () {

        clearTimeout(this._timeoutId);

        this._timeoutId = setTimeout(() => {

            this.tryUpdating().then(() => this.setInterval());

        }, Delay.oneHour);

    }

    };

const packageUpdater = new PackageUpdater();

module.exports = packageUpdater;
