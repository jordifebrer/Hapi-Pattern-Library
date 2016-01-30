"use strict";

class IndexRoute {
  constructor(server, data, emitter) {
    this.data = data;
    this.server = server;
    this.emitter = emitter;

    this.path = "/";

    this.init();
  }

  getData() {
    const _this = this;
    this.emitter.on('change', data => {
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
        reply.view('index', _this.getData());
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
  new IndexRoute(server, data, emitter);
