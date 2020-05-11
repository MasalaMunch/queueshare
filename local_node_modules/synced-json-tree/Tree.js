"use strict";

const LocalVersion = require(`./LocalVersion.js`);
const Version = require(`./Version.js`);

const Tree = class {

    constructor () {

        this.childTrees = new Map();

        this.localVersion = LocalVersion.oldest;

        this.pendingFunctions = [];

        this.version = Version.oldest;

    }

    build (path) {

        let tree;

        for (tree of this.iterativelyBuild(path)) {

        }

        return tree;

    }

    *iterativelyBuild (path) {

        let tree = this;

        yield tree;

        for (const child of path) {

            let childTree = tree.childTrees.get(child);

            if (childTree === undefined) {

                childTree = new Tree();

                tree.childTrees.set(child, childTree);

            }

            tree = childTree;

            yield tree;

        }

    }

    *Traversal () {

        yield this;

        for (const tree of this.childTrees.values()) {

            yield* tree.Traversal();

        }

    }

    Versions (path) {

        const versions = new Array(1 + path.length);

        let i = 0;

        let tree = this;

        while (true) {

            versions[i] = tree.version;

            if (i === path.length) {

                break;

            }

            tree = tree.childTrees.get(path[i]);

            i++;   

            if (tree === undefined) {

                versions.fill(Version.oldest, i);

                break;

            }

        }

        return versions;

    }

    };

module.exports = Tree;