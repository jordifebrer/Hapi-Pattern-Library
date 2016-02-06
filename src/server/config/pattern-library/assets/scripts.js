"use strict";

class Scripts {
    constructor(root) {
        this.root = root;
    }

    webpack() {}

    init() {
        this.webpack();
    }
}

module.exports = root => new Scripts(root);
