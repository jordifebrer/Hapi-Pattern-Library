"use strict";

class Iframe {
  constructor() {
    if (document.querySelectorAll('iframe').length >= 1) {
      this.init();
    }
  }

  socket() {
    const iframes = this.iframes;

    const reload = x =>
      x.contentWindow.location.reload();

    Array.prototype.forEach.call(iframes, el => {
      window.socket.on('update', () => {
        reload(el);
      });
    });
  }

  init() {
    this.iframes = document.querySelectorAll('iframe');

    this.socket();
  }
}

module.exports = new Iframe();
