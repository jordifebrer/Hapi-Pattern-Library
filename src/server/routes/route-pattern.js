"use strict";

class PatternRoute {
  constructor(server, data, emitter) {
    this.emitter = emitter;
    this.data = data;
    this.server = server;

    this.path = "/pattern/{name}";

    this.init();
  }

  getData(request) {
    const _this = this;
    const name = encodeURIComponent(request.params.name);

    this.emitter.on('change', data => {
      _this.data = data;
    });

    return _this.data.patterns.filter(x => x.name === name)[0];
  }

  get() {
    const _this = this;

    return {
      method: "GET",
      path: this.path,
      handler: function(request, reply) {

        reply.view('pattern', {
          pattern: _this.getData(request),
          style: [],
          script: []
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
  new PatternRoute(server, data, emitter);
