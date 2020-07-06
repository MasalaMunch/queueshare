"use strict";

const fs = require(`fs`);
const path = require(`path`);
const stringFileEncoding = require(`../string-file-encoding`);

const assetFolder = path.join(__dirname, `assetFolder`);

const AssetFolderPromise = (isDev) => new Promise((resolve, reject) => {

    if (isDev) {

        const Browserify = require(`browserify`);

        const scriptFile = path.join(__dirname, `startClient.script.js`);

        const browserScriptFileWriteStream = fs.createWriteStream(

            path.join(assetFolder, `start.browserified.js`),

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
