"use strict";

const stringEncoding = require(`../string-encoding`);

const StreamAsStringPromise = (stream) => new Promise((resolve, reject) => {

    const chunks = [];

    stream.on(`data`, (c) => chunks.push(c));

    stream.on(`error`, reject);

    stream.on(

        `end`, 

        () => resolve(Buffer.concat(chunks).toString(stringEncoding)),

        );

});

//^ https://stackoverflow.com/a/49428486

module.exports = StreamAsStringPromise;
