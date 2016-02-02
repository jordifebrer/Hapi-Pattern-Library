"use strict";

require('babel-core/register');

const React = require('react');
const ReactDom = require('react-dom/server');
const ReactComponent = require('../../assets/scripts/flux');
const App = React.createFactory(ReactComponent);

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
    const components = this.getData().components;

    return {
      method: "GET",
      path: this.path,
      handler: function (request, reply) {
        reply.view('index', {
          context: _this.getData(),
          reactClient: {components: components},
          react: ReactDom.renderToString(App({components: components})),
          script: ['/scripts/bundle'],
          style: ['/styles/main.css']
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
  new IndexRoute(server, data, emitter);