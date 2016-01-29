"use strict";

class Config {
    constructor(root) {
        this.root = root;

        this.init();
    }

    clientConfig() {
        this.client = require('./client')(this.root);
    }

    patternLibraryConfig() {
        this.patternLibrary = require('./pattern-library')(this.root);
    }

    init() {
        this.clientConfig();

        this.patternLibraryConfig();
    }
}

module.exports = root =>
    new Config(root);
