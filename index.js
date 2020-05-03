#!/usr/bin/env node

"use strict";

const {dir, port} = require(`./command.js`);
const nodemon = require(`nodemon`);

nodemon(`server.js -d ${dir} -p ${port}`);