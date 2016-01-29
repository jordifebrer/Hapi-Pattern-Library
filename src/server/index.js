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
        this.config = require("./config")(root, EventEmitter);
		this.server = new Hapi.Server();

        this.root = root;

        this.port = 3333;

        this.init();
    }

    data() {
        const components = this.config.patternLibrary.components;
        const templates = this.config.patternLibrary.templates;
        const patterns = this.config.patternLibrary.patterns;


        return {
            components: components,
            templates: templates,
            patterns: patterns
        };
    }

    setUp() {
        this.server.connection({
            port: this.port
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

    routes() {
        require("./routes/routes")(
            this.root, this.server, this.data(), EventEmitter
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
