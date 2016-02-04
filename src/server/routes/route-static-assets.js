"use strict";

const Path = require("path");

class StaticRoute {
  constructor(server, root) {
    this.root = root;
    this.server = server;

    this.init();
  }

  clientScripts() {
    const root = this.root;
    const server = this.server;
    const files = [
      {
        src: "/src/assets/scripts/bundle/bundle.js",
        url: "/scripts/bundle"
      }
    ];

    files.map(file => {
      server.route({
        method: "GET",
        path: file.url,
        handler: function (request, reply) {
          reply.file(Path.join(root, file.src));
        }
      });
    });
  }

  init() {
    this.clientScripts();
  }
}


module.exports = (server, root) =>
  new StaticRoute(server, root);