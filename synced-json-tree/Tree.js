"use strict";

const Version = require(`./Version.js`);

const Tree = class {

    constructor () {

        this.change = undefined;

        this.childTrees = new Map();

        this.queuedForeignChanges = [];

    }

    *Traversal () {

        yield this;

        for (const tree of this.childTrees.values()) {

            yield* tree.Traversal();

        }

    }

    Version () {

        return (

            this.change === undefined? 

            Version.oldest : this.change.versions[this.change.versions.length-1]

            );

    }

    };

module.exports = Tree;
