"use strict";

const fs = require(`fs`);
const path = require(`path`);
const stringEncoding = require(`../string-encoding`);

let css = [
    
    path.join(__dirname, `files`, `sanitize`, `sanitize.css`),

    path.join(__dirname, `files`, `sanitize`, `forms.css`),

    path.join(__dirname, `files`, `sanitize`, `typography.css`),

    path.join(__dirname, `files`, `sanitize`, `page.css`),

    path.join(__dirname, `files`, `root.css`),

    path.join(__dirname, `files`, `all.css`),

    path.join(__dirname, `files`, `data.css`),

    path.join(__dirname, `files`, `ui.css`),

    path.join(__dirname, `files`, `button.css`),

    path.join(__dirname, `files`, `list.css`),

    path.join(__dirname, `files`, `fab-container.css`),

    path.join(__dirname, `files`, `fab.css`),

    ];

css = css.map((file) => fs.readFileSync(file, {encoding: stringEncoding}));

css = css.join(``);

module.exports = css;
