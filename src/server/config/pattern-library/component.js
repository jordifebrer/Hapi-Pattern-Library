"use strict";

const Path = require("path");
const fs = require("fs");

class ComponentConfig {
  constructor(root) {
    this.root = root;

    this.dir = Path.join(this.root, "/pattern-library/components");

    let components = [];
    fs.readdirSync(this.dir).forEach(_ => {
      if (_.charAt(0) !== ".") {
        components.push(_);
      }
    });

    this.components = components;
  }

  files(component) {
    const currentDir = this.dir + "/" + component;

    return {
      docs: currentDir + "/README.md",
      html: currentDir + "/index.html",
      styles: currentDir + "/styles/main.less",
      scripts: currentDir + "/scripts/main.js",
      context: currentDir + "/context.json"
    }
  }

  catcher(file, json) {
    try {
      if (json) {
        return JSON.parse(fs.readFileSync(file, "utf8"));
      } else {
        return fs.readFileSync(file, "utf8");
      }
    } catch (e) {
      return `${file}, not found.`;
    }
  }

  data() {
    const _this = this;
    const componentArr = [];

    this.components.forEach((component, index) => {
      let files = _this.files(component);

      let currentComponent = {};

      currentComponent.id = index;
      currentComponent.name = component;
      currentComponent.docs = _this.catcher(files.docs, false);
      currentComponent.html = _this.catcher(files.html, false);
      currentComponent.styles = _this.catcher(files.styles, false);
      currentComponent.scripts = _this.catcher(files.scripts, false);
      currentComponent.context = _this.catcher(files.context, true);

      currentComponent.files = files;
      currentComponent.compiledHtml = "";

      componentArr.push(currentComponent);
    });

    return componentArr;
  }
}

module.exports = root =>
  new ComponentConfig(root);
