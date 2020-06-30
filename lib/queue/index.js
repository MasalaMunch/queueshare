"use strict";

const Queue = class {

    constructor () {

        this._firstNode = undefined;

        this._lastNode = undefined;

    }

    add (item) {

        const node = {item, nextNode: undefined};

        if (this._lastNode === undefined) {

            this._firstNode = node;

        }
        else {

            this._lastNode.nextNode = node;

        }

        this._lastNode = node;

    }

    deleteOldestItem () {

        this._firstNode = this._firstNode.nextNode;

        if (this._firstNode === undefined) {

            this._lastNode = undefined;
            
        }

    }

    IsEmpty () {

        return this._firstNode === undefined;

    }

    OldestItem () {

        return this._firstNode.item;

    }

    };

module.exports = Queue;
