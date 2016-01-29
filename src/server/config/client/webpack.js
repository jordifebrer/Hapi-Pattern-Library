"use strict";

const Path = require("path");
const Webpack = require("webpack");

class WebpackConfig {
    constructor(root) {
        this.root = root;

        this.init();
    }

    options() {
        const context = "./src/assets/scripts";

        return {
            entry: context + "/main.js",
            output: {
                path: context + "/bundle",
                filename: "bundle.js"
            },
            module: {
                loaders: [{
                    test: /\.js$/,
                    exclude: /(node_modules|bower_components)/,
                    loader: "babel",
                    query: {
                        presets: ["es2015"]
                    }
                }]
            },
            resolve: {
                extensions: ["", ".js", ".json"]
            }
        };
    }

    watch() {
        Webpack(this.options()).watch({
            aggregateTimeout: 300,
            poll: true
        }, function(err, stats) {
            if (err) {
                console.log(err);
            }
        });
    }

    init() {
        this.watch();
    }
}

module.exports = root =>
    new WebpackConfig(root);
