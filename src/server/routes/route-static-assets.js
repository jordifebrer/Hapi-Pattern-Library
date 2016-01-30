"use strict";

const Path = require("path");

class StaticRoute {
    constructor(server, root) {
        this.root = root;
        this.server = server;

        this.init();
    }

    clientScript() {
        const file = Path.join(this.root, "/src/assets/scripts/bundle/bundle.js");

        this.server.route({
            method: "GET",
            path: "/scripts/bundle",
            handler: function(request, reply) {
                reply.file(file);
            }
        });
    }

    init() {
        this.clientScript();
    }
}


module.exports = (server, root) =>
    new StaticRoute(server, root);
