"use strict";

class Config {
    constructor(root, emitter) {
        this.emitter = emitter;
        this.root = root;

        this.init();
    }

    clientConfig() {
        this.client = require('./client')(this.root);
    }

    patternLibraryConfig() {
        this.patternLibrary = require('./pattern-library')(this.root, this.emitter);
    }

    init() {
        this.clientConfig();

        this.patternLibraryConfig();
    }
}

module.exports = (root, emitter) =>
    new Config(root, emitter);
