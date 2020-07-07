"use strict";

const Delay = require(`../delay`);
const execa = require(`execa`);
const fs = require(`fs`);
const path = require(`path`);
const stringEncoding = require(`../string-encoding`);

const packageFile = require(`../qsp-file`);
const packageFolder = require(`../qsp-folder`);

const PackageJsonPromise = async () => {

    return JSON.parse(

        await fs.promises.readFile(packageFile, {encoding: stringEncoding})

        );

};

const parentPackageFolder = path.resolve(packageFolder, `..`, `..`);

const PackageUpdater = class {

    constructor () {

        this.hasUpdated = false;

        this._timeoutId = undefined;

    }

    setInterval () {

        clearTimeout(this._timeoutId);

        this._timeoutId = setTimeout(async () => {

            await this.tryUpdating();

            this.setInterval();

        }, Delay.oneHour);

    }

    async tryUpdating () {

        const {name, version} = await PackageJsonPromise();

        await execa(`npm`, [`update`, name], {cwd: parentPackageFolder});

        if (!this.hasUpdated) {

            this.hasUpdated = version !== (await PackageJsonPromise()).version;

        }

    }

    };

const packageUpdater = new PackageUpdater();

module.exports = packageUpdater;
