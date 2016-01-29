"use strict";

const Hapi = require("hapi");
const Hoek = require("hoek");
const Inert = require("inert");
const Vision = require("vision");
const Handlebars = require("handlebars");
const server = new Hapi.Server();


class Server {
    constructor(root) {
        this.config = require("./config")(root);

        this.root = root;

        this.port = 3333;

        this.init();
    }

    data() {
        const components = this.config.patternLibrary.components;
        const templates = this.config.patternLibrary.templates;
        const patterns = this.config.patternLibrary.patterns;


        return {
            patterns: patterns,
            templates: templates,
            components: components
        };
    }

    setUp() {
        server.connection({
            port: this.port
        });

        server.register([Inert, Vision], err => {

            Hoek.assert(!err, err);

            server.views({
                engines: {
                    html: Handlebars
                },
                layout: "default",
                path: "./src/views",
                relativeTo: this.root,
                layoutPath: "./src/views/layouts",
                helpersPath: "./src/views/helpers",
                partialsPath: "./src/views/partials",
                context: this.data()
            });

        });
    }

    routes() {
        require("./routes/routes")(
            this.root, server, this.data()
        );
    }

    start() {
        server.start(() => {
            console.log(`Server running at: ${server.info.uri}`);
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
