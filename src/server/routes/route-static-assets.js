"use strict";

const fs = require("fs");
const Path = require("path");

class StaticRoute {
    constructor(server, root, emitter) {
        this.root = root;
        this.emitter = emitter;
        this.server = server;

        this.init();
    }

    dynamicAssets() {
        const root = this.root;
        const server = this.server;

        const files = [{
            src: "/dist/bundle.js",
            url: "/app/scripts/bundle"
        }, {
            src: "/dist/main.css",
            url: "/app/styles/main"
        }];

        const getFile = file => {
            return Path.join(root, file);
        };

        files.map(file => {
            server.route({
                method: "GET",
                path: file.url,
                handler: function(request, reply) {
                    reply.file(getFile(file.src));
                }
            });
        });

    }

    clientScripts() {
        const root = this.root;
        const server = this.server;
        const files = [{
            src: "/src/assets/scripts/bundle/bundle.js",
            url: "/scripts/bundle"
        }];

        files.map(file => {
            server.route({
                method: "GET",
                path: file.url,
                handler: function(request, reply) {
                    reply.file(Path.join(root, file.src));
                }
            });
        });
    }

    init() {
        this.clientScripts();
        this.dynamicAssets();
    }
}


module.exports = (server, root, emitter) =>
    new StaticRoute(server, root, emitter);
