"use strict";

const fs = require(`fs`);
const path = require(`path`);
const stringFileEncoding = require(`../string-file-encoding`);

const assetFolder = path.join(__dirname, `folder`);

const AssetFolder = (isDev) => new Promise((resolve, reject) => {

    if (isDev) {

        const Browserify = require(`browserify`);

        const script = path.join(__dirname, `script.js`);

        const writeStream = fs.createWriteStream(

            path.join(assetFolder, `browserifiedScript.js`),

            {encoding: stringFileEncoding},

            );

        Browserify(script).bundle().pipe(writeStream);

        writeStream.on(`finish`, () => resolve(assetFolder));

    }
    else {

        resolve(assetFolder);

    }

});

module.exports = AssetFolder;
