"use strict";

class Iframe {
  constructor() {
    if ($('iframe').length) {
      this.init();
    }
  }

  socket() {
    const iframes = this.iframes;

    window.socket.on('update', data => {
      $.each(iframes, function(index, el) {
        if (el.name === data.file) {
          $(el).attr('src', $(el).attr('src'));
        }
      });
    });
  }

  init() {
    this.iframes = $('iframe');

    this.socket();
  }
}

module.exports = new Iframe();