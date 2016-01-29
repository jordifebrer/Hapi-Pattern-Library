"use strict";

class Main {
    constructor(root) {
        this.root = root;

        this.init();
    }

    server() {
        require("./server")(this.root);
    }

    init() {
        this.server();
    }
}

module.exports = _ =>
    new Main(_);
