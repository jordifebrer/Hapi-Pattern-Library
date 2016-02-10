"use strict";

class TemplateRoute {
  constructor(server, data, emitter) {
    this.emitter = emitter;
    this.data = data;
    this.server = server;

    this.path = "/template/{name}";

    this.init();
  }

  getData(request) {
    const _this = this;
    const name = encodeURIComponent(request.params.name);

    this.emitter.on("change", data => {
      _this.data = data;
    });

    return _this.data.templates.filter(x => x.name === name)[0];
  }

  get() {
    const _this = this;

    return {
      method: "GET",
      path: this.path,
      handler: function(request, reply) {
        reply.view("template", {
          template: _this.getData(request),
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
  new TemplateRoute(server, data, emitter);
