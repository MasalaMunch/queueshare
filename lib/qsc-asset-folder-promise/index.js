"use strict";

const fs = require(`fs`);
const path = require(`path`);
const stringFileEncoding = require(`../string-file-encoding`);

const assetFolder = path.join(__dirname, `rawAssets`);

const AssetFolderPromise = (isDev) => new Promise((resolve, reject) => {

    if (isDev) {

        const Browserify = require(`browserify`);
        const mustache = require(`mustache`);

        //TODO handle css templates

        const scriptFile = path.join(__dirname, `script.js`);

        const browserScriptFileWriteStream = fs.createWriteStream(

            path.join(assetFolder, scriptFilename),

            {encoding: stringFileEncoding},

            );

        Browserify(scriptFile).bundle().pipe(browserScriptFileWriteStream);

        browserScriptFileWriteStream.on(`finish`, () => resolve(assetFolder));

    }
    else {

        resolve(assetFolder);

    }

});

module.exports = AssetFolderPromise;
