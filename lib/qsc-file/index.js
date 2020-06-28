"use strict";

const fs = require(`fs`);
const path = require(`path`);
const stringFileEncoding = require(`../string-file-encoding`);

const defaultTheme = require(`../default-qsc-theme`);

const file = path.join(__dirname, `file.html`);

const File = (isDev) => {

    if (isDev) {

        const mustache = require(`mustache`);

        const fileTemplateContents = fs.readFileSync(

            path.join(__dirname, `file.template.html`),

            {encoding: stringFileEncoding},

            );

        const newFileContents = mustache.render(fileTemplateContents, {

            defaultTheme,

            });

        fs.writeFileSync(file, newFileContents, {encoding: stringFileEncoding});

    }

    return file;

};

module.exports = File;
