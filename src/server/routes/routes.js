"use strict";

class Routes {
    constructor(root, server, data) {
        this.root = root;
        this.data = data;
        this.server = server;

        this.init();
    }

    routes() {
        return [
            "./route-index.js",
            "./route-api.js",
            "./route-template.js",
            "./route-component.js"
        ];
    }

    staticRoutes() {
        return [
            "./route-static-assets.js"
        ];
    }

    init() {
        const data = this.data;
        const root = this.root;
        const server = this.server;

        this.routes()
            .forEach(route => require(route)(server, data));

        this.staticRoutes()
            .forEach(route => require(route)(server, root));
    }
}

module.exports = (root, server, data) =>
    new Routes(root, server, data);
