"use strict";

class IndexRoute {
    constructor(server, data) {
        this.data = data;
        this.server = server;

        this.path = "/";

        this.init();
    }

    get() {
        return {
            method: "GET",
            path: this.path,
            handler: {
                view: {
                    template: "index"
                }
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
    new IndexRoute(server, data);
