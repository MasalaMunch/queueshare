"use strict";

const fs = require(`fs`);
const path = require(`path`);
const stringEncoding = require(`../string-encoding`);

const template = fs.readFileSync(

    path.join(__dirname, `template.html`),

    {encoding: stringEncoding},

    );

module.exports = template;
