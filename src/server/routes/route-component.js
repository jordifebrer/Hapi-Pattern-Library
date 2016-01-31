"use strict";

class ComponentRoute {
  constructor(server, data) {
    this.data = data;
    this.server = server;

    this.path = "/component/{name}";

    this.init();
  }

  get() {
    const _this = this;

    return {
      method: "GET",
      path: this.path,
      handler: function(request, reply) {
        let name = encodeURIComponent(request.params.name);
        let component = _this.data.components.filter(x => x.name === name)[0];

        reply(component.markup);
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
