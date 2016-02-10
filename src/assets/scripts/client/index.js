"use strict";

exports.reloadPage = function() {
    window.socket.on("update", function() {
        return window.location.reload();
    });
};

exports.inIframe = function(callback) {
    if (window.self === window.top) {
        return callback();
    }
};
