"use strict";

const Change = (foreignChange, localVersion) => {

    return {...foreignChange, localVersion};

};

module.exports = Change;
