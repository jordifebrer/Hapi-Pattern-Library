"use strict";

class APIRoute {
    constructor(server, data) {
        this.data = data;
        this.server = server;

        this.path = "/api";

        this.init();
    }

    get() {
        const data = this.data;

        return {
            method: "GET",
            path: this.path,
            handler: function (request, reply) {
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


module.exports = (server, data) =>
    new APIRoute(server, data);
