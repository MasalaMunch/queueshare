"use strict";

const homeDir = require(`os`).homedir();
const Path = require(`path`);
const {program} = require(`commander`);
const {version} = require(`./package.json`);

program.version(
    version, 
    `-v|--version`
    );

program.option(
    `-d|--dir <dir>`, 
    `where the queue will be stored`, 
    Path.join(homeDir, `queueshare`),
    );

program.option(
    `-p|--port <port>`, 
    `where the queue will be served`, 
    String(42069),
    );

program.parse(process.argv);

module.exports = {dir: program.dir, port: Number(program.port)};
