"use strict";

const Path = require("path");
const fs = require("fs");
const Handlebars = require("handlebars");

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
        };
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

    compileHandlebars(src, context) {
        let template;

        template = Handlebars.compile(src);
        return template(context);
    }

    data() {
        const _this = this;
        const templateArr = [];

        this.templates.forEach((template, index) => {
            let files = _this.files(template);

            let currentTemplate = {};

            currentTemplate.id = index;
            currentTemplate.name = template;
            currentTemplate.markup = _this.catcher(files.html, false);
            currentTemplate.context = _this.catcher(files.context, true);

            currentTemplate.files = files;
            currentTemplate.compiledHtml = _this.compileHandlebars(
                currentTemplate.markup,
                currentTemplate.context
            );

            templateArr.push(currentTemplate);
        });

        return templateArr;
    }
}

module.exports = root =>
    new TemplateConfig(root);
