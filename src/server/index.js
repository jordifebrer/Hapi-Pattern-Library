"use strict";

const Hapi = require("hapi");
const Hoek = require("hoek");
const Inert = require("inert");
const Vision = require("vision");
const Handlebars = require("handlebars");
const Events = require("events");
const EventEmitter = new Events.EventEmitter();

class Server {
  constructor(root) {
    this.emitter = EventEmitter;
    this.server = new Hapi.Server();

    this.root = root;

    this.port = 3333;

    this.init();
  }

  data() {
    const config = this.config();
    const components = config.patternLibrary.components;
    const templates = config.patternLibrary.templates;
    const patterns = config.patternLibrary.patterns;

    return {
      components: components,
      templates: templates,
      patterns: patterns
    };
  }

  setUp() {
    const _this = this;
    this.server.connection({
      port: this.port
    });

    const io = require('socket.io')(_this.server.listener);

    io.on('connection', socket => {
      _this.emitter.on('change', data => {
        socket.emit('update', data);
      });
    });

    this.server.register([Inert, Vision], err => {

      Hoek.assert(!err, err);

      this.server.views({
        engines: {
          html: Handlebars
        },
        layout: "default",
        path: "./src/views",
        relativeTo: this.root,
        layoutPath: "./src/views/layouts",
        helpersPath: "./src/views/helpers",
        partialsPath: "./src/views/partials"
      });
    });
  }

  config() {
    return require("./config")(this.root, this.emitter);
  }

  routes() {
    require("./routes/routes")(
      this.root, this.server, this.data(), this.emitter
    );
  }

  start() {
    this.server.start(() => {
      console.log(`Server running at: ${this.server.info.uri}`);
    });
  }

  init() {
    this.setUp();
    this.routes();
    this.start();
  }
}

module.exports = root =>
  new Server(root);
