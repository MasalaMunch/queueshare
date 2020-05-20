"use strict";

const FileContents = require(`../file-contents`);
const fs = require(`fs`);
const RandomPort = require(`../random-port`);

const fileOptions = {encoding: `utf8`};

const QssPort = (dataPaths) => {

    let port = Number(FileContents(dataPaths.port, fileOptions));

    if (isNaN(port)) {

        port = RandomPort();

        fs.writeFileSync(dataPaths.port, String(port), fileOptions);

    }

    return port;

};

module.exports = QssPort;
