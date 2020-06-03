"use strict";

const execa = require(`execa`);
const path = require(`path`);

const folder = require(`../qsp-folder`);

const parentPackageFolder = path.resolve(folder, `..`, `..`);

const update = () => {

    return execa(`npm`, [`update`, `queueshare`], {cwd: parentPackageFolder});

};

module.exports = update;
