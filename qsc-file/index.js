"use strict";

const fs = require(`fs`);
const path = require(`path`);
const stringFileEncoding = require(`../string-file-encoding`);

const apiPaths = require(`../qss-api-paths`);

const file = path.join(__dirname, `file.html`);

const File = (isDev) => {

    if (isDev) {

        const mustache = require(`mustache`);

        const templateContents = fs.readFileSync(

            path.join(__dirname, `template.html`),

            {encoding: stringFileEncoding},

            );

        const newFileContents = mustache.render(templateContents, {

            assetsUrl: apiPaths.clientAssets,

            });

        fs.writeFileSync(file, newFileContents, {encoding: stringFileEncoding});

    }

    return file;

};

module.exports = File;
