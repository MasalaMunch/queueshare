"use strict";

const assert = require(`assert`);

module.exports = class {

    constructor () {

        this._firstNode = undefined;
        this._lastNode = undefined;

    }

    add (task) {

        assert(typeof task === `function`);

        const node = {task};

        if (this._lastNode === undefined) {

            this._lastNode = node;
            this._firstNode = node;
            this._start();

        }
        else {

            this._lastNode.nextNode = node;
            this._lastNode = node;

        }

    }

    _start () {

        setTimeout(() => {

            let error, threwAnError;

            try {

                this._firstNode.task();
                threwAnError = false;

            } catch (e) {

                error = e;
                threwAnError = true;

            }

            this._firstNode = this._firstNode.nextNode;

            if (this._firstNode === undefined) {

                this._lastNode = undefined;
                
            }
            else {

                this._start();

            }

            if (threwAnError) {

                throw error;

            }

        }, 0);

    }

    };