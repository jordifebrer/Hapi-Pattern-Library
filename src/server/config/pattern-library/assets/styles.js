"use strict";

const fs = require("fs");
const sass = require("node-sass");

class Styles {
    constructor(root) {
        this.root = root;

        this.init();
    }

    options(context) {
        return {
            file: context + "main.scss",
            outputStyle: "compressed",
            includePaths: [
                context,
                this.root + "/pattern-library/components/"
            ]
        };
    }

    compileScss() {
        const context = this.root + "/pattern-library/assets/styles/";
        const result = sass.renderSync(this.options(context));

        fs.writeFileSync(
            this.root + "/dist/main.css", result.css, "utf8"
        );
    }

    init() {
        this.compileScss();
    }
}

module.exports = root => new Styles(root);
