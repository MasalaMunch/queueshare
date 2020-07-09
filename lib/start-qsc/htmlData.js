"use strict";

const CamelCased = require(`camelcase`);
const Elm = require(`../elm`);

const htmlDataElm = Elm.ById(`data`);

const htmlData = {};

for (const child of htmlDataElm.children) {

    htmlData[CamelCased(child.dataset.id)] = child.textContent;

}

module.exports = htmlData;
