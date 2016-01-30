"use strict";

class TemplateRoute {
  constructor(server, data) {
    this.data = data;
    this.server = server;

    this.path = "/template/{name}";

    this.init();
  }

  get() {
    return {
      method: "GET",
      path: this.path,
      handler: function(request, reply) {
        reply("Hello World");
      }
    };
  }

  init() {
    this.server.route(
      [
        this.get()
      ]
    );
  }
}


module.exports = (server, data) =>
  new TemplateRoute(server, data);
