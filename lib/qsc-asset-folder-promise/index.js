"use strict";

const fs = require(`fs`);
const path = require(`path`);
const stringFileEncoding = require(`../string-file-encoding`);

const serverApiPaths = require(`../qss-api-paths`);

const assetFolder = path.join(__dirname, `assetFolder`);

const AssetFolderPromise = (isDev) => new Promise((resolve, reject) => {

    if (isDev) {

        const Browserify = require(`browserify`);
        const mustache = require(`mustache`);

        //TODO handle css templates

        const fabTemplateContents = fs.readFileSync(

            path.join(__dirname, `fab.template.css`),

            {encoding: stringFileEncoding},

            );

        const newFabContents = mustache.render(fabTemplateContents, {

            assetsPath: serverApiPaths.clientAssets,

            });

        fs.writeFileSync(

            path.join(assetFolder, fabFilename),

            newFabContents, 

            {encoding: stringFileEncoding},

            );

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
