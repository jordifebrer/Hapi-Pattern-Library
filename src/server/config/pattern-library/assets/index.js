"use strict";

class Assets {
    constructor(root) {
        this.root = root;
    }

    scripts() {
        require('./scripts.js')(this.root);
    }

    styles() {
        require('./styles.js')(this.root);
    }

    init() {
        this.scripts();
        this.styles();
    }
}

module.exports = root => new Assets(root);
