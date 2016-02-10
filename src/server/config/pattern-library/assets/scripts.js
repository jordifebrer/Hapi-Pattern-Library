"use strict";

const Webpack = require("webpack");

class Scripts {
    constructor(root) {
        this.root = root;

        this.init();
    }

    options() {
        const context = `${this.root}/pattern-library/assets/scripts`;

        return {
            context: context,
            entry: "./main.js",
            output: {
                path: this.root + "/dist",
                filename: "bundle.js"
            },
            module: {
                loaders: [{
                    test: /\.js$/,
                    exclude: /(node_modules|bower_components)/,
                    loader: "babel",
                    query: {
                        presets: ["es2015", "react"]
                    }
                }]
            },
            resolve: {
                extensions: ["", ".js", ".json"]
            }
        };
    }

    webpack() {
        Webpack(this.options()).watch({
            aggregateTimeout: 300,
            poll: true
        }, function(err, stats) {
            if (err) {
                console.log(err);
            }

            if (stats.compilation.errors.length >= 1) {
                console.log(stats.compilation.errors);
            }
        });
    }

    init() {
        this.webpack();
    }
}

module.exports = root => new Scripts(root);
