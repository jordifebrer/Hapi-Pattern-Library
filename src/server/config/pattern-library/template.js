"use strict";

const Path = require("path");
const fs = require("fs");

class TemplateConfig {
    constructor(root) {
        this.root = root;

        this.dir = Path.join(this.root, "/pattern-library/templates");

        let templates = [];
        fs.readdirSync(this.dir).forEach(_ => {
            if (_.charAt(0) !== ".") {
                templates.push(_);
            }
        });

        this.templates = templates;
    }

    files(template) {
        const currentDir = this.dir + "/" + template;

        return {
            html: currentDir + "/index.html",
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
        const templateArr = [];

        this.templates.forEach((template, index) => {
            let files = _this.files(template);

            let currentTemplate = {};

            currentTemplate.id = index;
            currentTemplate.name = template;
            currentTemplate.html = _this.catcher(files.html, false);
            currentTemplate.context = _this.catcher(files.context, true);

            currentTemplate.files = files;
            currentTemplate.compiledHtml = "";

            templateArr.push(currentTemplate);
        });

        return templateArr;
    }
}

module.exports = root =>
    new TemplateConfig(root);
