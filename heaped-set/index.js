"use strict";

const HeapedSet = class {

    constructor (ValueComparison) {

        this._heap = [];

        this._ValueComparison = ValueComparison;

        this._valueHeapIndices = new Map();

    }

    add (value) {

        if (!this._valueHeapIndices.has(value)) {

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

    }

    delete (value) {

        const heapIndex = this._valueHeapIndices.get(value);

        if (heapIndex !== undefined) {

            const lastValue = this._heap.pop();

            if (lastValue !== value) {

                this._fixChildren(lastValue, heapIndex);

            }

            this._valueHeapIndices.delete(value);

        }

    }

    fix () {

        for (let i=(this._heap.length-2)>>1; i>=0; i--) {

            this._fixChildren(this._heap[i], i);

        }

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
