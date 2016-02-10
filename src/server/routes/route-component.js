"use strict";

class ComponentRoute {
  constructor(server, data, emitter) {
    this.emitter = emitter;
    this.data = data;
    this.server = server;

    this.path = "/component/{name}";

    this.init();
  }

  getData(request) {
    const _this = this;
    const name = encodeURIComponent(request.params.name);

    this.emitter.on("change", data => {
      _this.data = data;
    });

    return _this.data.components.filter(x => x.name === name)[0];
  }

  get() {
    const _this = this;

    return {
      method: "GET",
      path: this.path,
      handler: function(request, reply) {
        reply.view("component", {
          component: _this.getData(request),
          style: ["/app/styles/main"],
          script: ["/scripts/bundle", "/app/scripts/bundle"]
        });
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


module.exports = (server, data, emitter) =>
  new ComponentRoute(server, data, emitter);
