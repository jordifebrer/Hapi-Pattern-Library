"use strict";

const Path = require("path");
const fs = require("fs");
const Handlebars = require("handlebars");

const Marked = require("marked");

Marked.setOptions({
    renderer: new Marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: true,
    smartLists: true,
    smartypants: false
});

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
            styles: currentDir + "/styles/main.scss",
            scripts: currentDir + "/scripts/main.js",
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
        const componentArr = [];

        this.components.forEach(component => {
            const files = _this.files(component);

            Handlebars.registerPartial(
                component,
                _this.catcher(files.html, false)
            );
        });

        this.components.forEach((component, index) => {
            const files = _this.files(component);

            const currentComponent = {};

            currentComponent.id = index;
            currentComponent.name = component;
            currentComponent.docs = Marked(_this.catcher(files.docs, false));

            console.log(currentComponent.docs);

            currentComponent.markup = _this.catcher(files.html, false);
            currentComponent.styles = _this.catcher(files.styles, false);
            currentComponent.scripts = _this.catcher(files.scripts, false);
            currentComponent.context = _this.catcher(files.context, true);

            currentComponent.files = files;
            currentComponent.compiledHtml = _this.compileHandlebars(
                currentComponent.markup,
                currentComponent.context
            );

            componentArr.push(currentComponent);
        });


        return componentArr;
    }
}

module.exports = root =>
    new ComponentConfig(root);
