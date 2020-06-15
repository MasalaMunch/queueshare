"use strict";

const Version = require(`./Version.js`);

const Tree = class {

    constructor () {

        this.childTrees = new Map();

        this.localVersion = undefined;

        this.pendingForeignChanges = [];

        this.version = Version.oldest;

    }

    *Traversal () {

        yield this;

        for (const tree of this.childTrees.values()) {

            yield* tree.Traversal();

        }

    }

    };

module.exports = Tree;
