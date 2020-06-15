"use strict";

const assert = require(`assert`);

const HeapedSet = class {

    constructor (ValueComparison) {

        assert(typeof ValueComparison === `function`);

        this._heap = [];

        this._ValueComparison = ValueComparison;

        this._valueHeapIndices = new Map();

    }

    add (value) {

        const valueIsNew = !this.Has(value);

        if (valueIsNew) {

            let heapIndex = this._heap.length;

            while (heapIndex > 0) {

                const parentIndex = (heapIndex - 1) >> 1;

                const parentValue = this._heap[parentIndex];

                if (this._ValueComparison(value, parentValue) < 0) {

                    this._set(parentValue, heapIndex);

                    heapIndex = parentIndex;

                }
                else {

                    break;

                }

            }

            this._set(value, heapIndex);

        }

        return valueIsNew;

    }

    delete (value) {

        const valueExists = this.Has(value);

        if (valueExists) {

            const lastValue = this._heap.pop();

            if (value !== lastValue) {

                this._fixChildren(lastValue, this._valueHeapIndices.get(value));

            }

            this._valueHeapIndices.delete(value);

        }

        return valueExists;

    }

    fix () {

        for (let i=(this._heap.length-2)>>1; i>=0; i--) {

            this._fixChildren(this._heap[i], i);

        }

    }

    Has (value) {

        return this._valueHeapIndices.has(value);

    }

    get min () {

        return this._heap[0];

    }

    get size () {

        return this._heap.length;

    }

    _fixChildren (value, heapIndex) {

        const ValueComparison = this._ValueComparison;

        while (true) {

            const leftChildIndex = (heapIndex << 1) + 1;

            if (leftChildIndex < this._heap.length) {

                const leftChildValue = this._heap[leftChildIndex];

                let minChildIndex, minChildValue;

                const rightChildIndex = leftChildIndex + 1;

                if (rightChildIndex < this._heap.length) {

                    const rightChildValue = this._heap[rightChildIndex];

                    if (ValueComparison(rightChildValue, leftChildValue) < 0) {

                        minChildIndex = rightChildIndex;

                        minChildValue = rightChildValue;

                    }
                    else {

                        minChildIndex = leftChildIndex;

                        minChildValue = leftChildValue;

                    }

                }
                else {

                    minChildIndex = leftChildIndex;

                    minChildValue = leftChildValue;

                }

                if (ValueComparison(minChildValue, value) < 0) {

                    this._set(minChildValue, heapIndex);

                    heapIndex = minChildIndex;

                }
                else {

                    break;

                }

            }
            else {

                break;

            }

        }

        this._set(value, heapIndex);

    }

    _set (value, heapIndex) {

        this._heap[heapIndex] = value;

        this._valueHeapIndices.set(value, heapIndex);

    }

};

module.exports = HeapedSet;
