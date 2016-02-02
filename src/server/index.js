"use strict";

const Hapi = require("hapi");
const Hoek = require("hoek");
const Inert = require("inert");
const Vision = require("vision");
const Handlebars = require("handlebars");
const HapiSass = require("hapi-sass");
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

    const sassOptions = {
      src: this.root + '/src/assets/styles/',
      dest: this.root + '/src/assets/styles/',
      force: true,
      debug: false,
      routePath: '/styles/{file}.css',
      includePaths: [
        this.root + '/src/assets/styles/',
        this.root + '/node_modules/bootstrap/dist/css/'
      ],
      outputStyle: 'compressed',
      sourceComments: true
    };

    this.server.register([Inert, Vision, {
      register: HapiSass,
      options: sassOptions
    }], err => {

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
    require("./routes")(
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
