"use strict";

const config = root => {
    const packageInfo = require(root + '/package.json');

    return {
        "name": "Hapi.js Pattern Library",
        "description": "A pattern library built for simplicity and speed.",
        "version": packageInfo.version,
        "authors": ["BrianDGLS"]
    };
};

module.exports = root => config(root);
