"use strict";

const homeDir = require(`os`).homedir();
const JoinedPaths = require(`path`).join;
const {program} = require(`commander`);
const {version} = require(`./package.json`);

program.version(
    version, 
    `-v|--version`
    );

program.option(
    `-d|--dir <dir>`, 
    `where the queue will be stored`, 
    JoinedPaths(homeDir, `queueshare`),
    );

program.option(
    `-p|--port <port>`, 
    `where the queue will be served`, 
    String(42069),
    );

program.parse(process.argv);

module.exports = {dir: program.dir, port: Number(program.port)};
