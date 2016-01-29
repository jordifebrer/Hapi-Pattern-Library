"use strict";

class Client {
    constructor(root) {
        this.root = root;

        this.init();
    }

    webpack() {
        require('./webpack')(this.root);
    }

    init() {
        this.webpack();
    }
}

module.exports = root =>
    new Client(root);
