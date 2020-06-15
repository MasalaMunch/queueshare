"use strict";

const OwnProps = require(`../own-props`);

const Value = require(`../qsh-value`);

const Change = {

    Leaves: function* (localChange) {

        const {path, value} = localChange;

        if (Value.IsPrimitive(value)) {

            yield localChange;

        }
        else {

            for (const child of OwnProps(value)) {

                yield* Change.Leaves(

                    {path: [...path, child], value: value[child]}

                    );

            }

        }

    },

    };

module.exports = Change;
