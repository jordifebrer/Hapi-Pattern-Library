"use strict";

class ComponentRoute {
  constructor(server, data) {
    this.data = data;
    this.server = server;

    this.path = "/component/{name}";

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
  new ComponentRoute(server, data);
