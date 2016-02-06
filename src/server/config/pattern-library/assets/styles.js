"use strict";

class Styles {
    constructor(root) {
        this.root = root;
    }

    compileScss() {}

    init() {
        this.compileScss();
    }
}

module.exports = root => new Styles(root);
