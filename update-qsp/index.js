"use strict";

const execa = require(`execa`);
const path = require(`path`);

const JsonPromise = require(`../qsp-json-promise`);
const folder = require(`../qsp-folder`);

const parentPackageFolder = path.resolve(folder, `..`, `..`);

const update = async () => {

    const {name} = await JsonPromise();

    await execa(`npm`, [`update`, name], {cwd: parentPackageFolder});

};

module.exports = update;
