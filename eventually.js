"use strict";

module.exports = (func) => new Promise((resolve, reject) => {

    setTimeout(() => resolve(func()), 0);

});