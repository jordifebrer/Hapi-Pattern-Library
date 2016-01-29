"use strict";

class PatternLibrary {
    constructor(root) {
        this.root = root;

        this.init();
    }

    component() {
        this.components = require('./component')(this.root).data();
    }

    template() {
        this.templates = require('./template')(this.root).data();
    }

    pattern() {
        this.patterns = require('./pattern')(this.root).data();
    }

    init() {
        this.component();
        this.template();
        this.pattern();
    }
}

module.exports = root =>
    new PatternLibrary(root);
