"use strict";

const fs = require(`fs`);
const path = require(`path`);
const stringFileEncoding = require(`../string-file-encoding`);

const assetsUrl = require(`../qsc-assets-url`);
const scriptFilename = require(`../qsc-script-filename`);

const file = path.join(__dirname, `file.html`);

const File = (isDev) => {

    if (isDev) {

        const mustache = require(`mustache`);

        const fileTemplateContents = fs.readFileSync(

            path.join(__dirname, `file.template.html`),

            {encoding: stringFileEncoding},

            );

        const newFileContents = mustache.render(fileTemplateContents, {

            assetsUrl,

            scriptFilename,

            });

        fs.writeFileSync(file, newFileContents, {encoding: stringFileEncoding});

    }

    return file;

};

module.exports = File;
