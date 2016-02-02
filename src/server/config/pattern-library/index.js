"use strict";

const chokidar = require('chokidar');

class PatternLibrary {
  constructor(root, emitter) {
    this.emitter = emitter;
    this.root = root;

    this.init();
  }

  component() {
    this.components = require('./component')(this.root).data();

    return this.components;
  }

  template() {
    this.templates = require('./template')(this.root).data();

    return this.templates;
  }

  pattern() {
    this.patterns = require('./pattern')(this.root).data();

    return this.patterns;
  }

  library() {
    this.component();
    this.template();
    this.pattern();
  }

  watch() {
    const _this = this;
    const watcher = chokidar.watch(this.root + '/pattern-library', {
      ignored: /[\/\\]\./,
      persitant: true
    });

    const handler = path => {
      console.log(`File | ${path} | has been changed`);

      _this.library();

      const getName = pathToFile => {
        const arr = pathToFile.split('/');
        
        return arr[arr.length - 2];
      };


      _this.emitter.emit('change', {
        components: _this.components,
        templates: _this.templates,
        patterns: _this.patterns,
        file: getName(path)
      });
    };

    watcher
      .on('change', handler);
  }

  init() {
    this.library();

    this.watch();
  }
}

module.exports = (root, emitter) =>
  new PatternLibrary(root, emitter);