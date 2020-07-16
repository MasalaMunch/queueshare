"use strict";

const IsKeyboardUser = () => {

    return matchMedia(`(hover: hover) and (pointer: fine)`).matches;

    //^ https://stackoverflow.com/a/47703337

};

module.exports= IsKeyboardUser;
