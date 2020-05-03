"use strict";

const os = require(`os`);
const {version} = require(`./package.json`);
const Path = require(`path`);
const {program} = require(`commander`);

program.version(
    version, 
    `-v|--version`
    );

program.option(
    `-d|--dir <dir>`, 
    `where the queue will be stored`, 
    Path.join(os.homedir(), `queueshare`),
    );

program.option(
    `-p|--port <port>`, 
    `where the queue will be served`, 
    String(42069),
    );

program.parse(process.argv);

module.exports = {dir: program.dir, port: Number(program.port)};
