"use strict";

const fs = require(`fs`);
const path = require(`path`);
const stringFileEncoding = require(`../string-file-encoding`);

const assetsUrl = require(`../qsc-assets-url`);
const scriptFilename = require(`../qsc-script-filename`);

const assetFolder = path.join(__dirname, `folder`);

const AssetFolderPromise = (isDev) => new Promise((resolve, reject) => {

    if (isDev) {

        const Browserify = require(`browserify`);
        const mustache = require(`mustache`);

        const fabTemplateContents = fs.readFileSync(

            path.join(__dirname, `fab.template.css`),

            {encoding: stringFileEncoding},

            );

        const newFabContents = mustache.render(fabTemplateContents, {

            assetsUrl,

            });

        fs.writeFileSync(

            path.join(assetFolder, `fab.css`),

            newFabContents, 

            {encoding: stringFileEncoding},

            );

        const script = path.join(__dirname, `script.js`);

        const writeStream = fs.createWriteStream(

            path.join(assetFolder, scriptFilename),

            {encoding: stringFileEncoding},

            );

        Browserify(script).bundle().pipe(writeStream);

        writeStream.on(`finish`, () => resolve(assetFolder));

    }
    else {

        resolve(assetFolder);

    }

});

module.exports = AssetFolderPromise;
