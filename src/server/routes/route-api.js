"use strict";

class APIRoute {
  constructor(server, data, emitter) {
    this.data = data;
    this.server = server;
    this.emitter = emitter;

    this.path = "/api";

    this.init();
  }

  getData() {
    const _this = this;
    this.emitter.on("fileChange", data => {
      _this.data = data;
    });

    return this.data;
  }

  get() {
    const _this = this;

    return {
      method: "GET",
      path: this.path,
      handler: function(request, reply) {
        const data = _this.getData();

        reply(data);
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
  new APIRoute(server, data, emitter);
