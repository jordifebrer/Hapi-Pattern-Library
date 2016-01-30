"use strict";

const Webpack = require("webpack");

class WebpackConfig {
  constructor(root) {
    this.root = root;

    this.init();
  }

  options() {
    const context = `${this.root}/src/assets/scripts`;

    return {
      context: context,
      entry: "./main.js",
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

      if (stats.compilation.errors.length >= 1) {
        console.log(stats.compilation.errors)
      }
    });
  }

  init() {
    this.watch();
  }
}

module.exports = root =>
  new WebpackConfig(root);
