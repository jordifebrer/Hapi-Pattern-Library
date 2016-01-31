"use strict";

const Path = require("path");
const fs = require("fs");

class PatternConfig {
  constructor(root) {
    this.root = root;

    this.dir = Path.join(this.root, "/pattern-library/patterns");

    let patterns = [];
    fs.readdirSync(this.dir).forEach(_ => {
      if (_.charAt(0) !== ".") {
        patterns.push(_);
      }
    });

    this.patterns = patterns;
  }

  files(pattern) {
    const currentDir = this.dir + "/";

    return {
      html: currentDir + pattern
    };
  }

  data() {
    const _this = this;
    const patternArr = [];

    this.patterns.forEach((pattern, index) => {
      let files = _this.files(pattern);

      let currentPattern = {};

      currentPattern.id = index;
      currentPattern.name = pattern.split(".")[0];
      currentPattern.markup = fs.readFileSync(files.html, "utf8");

      currentPattern.file = files.html;

      patternArr.push(currentPattern);
    });

    return patternArr;
  }
}

module.exports = root =>
  new PatternConfig(root);
