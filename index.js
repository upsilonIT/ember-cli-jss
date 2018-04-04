'use strict';

const HtmlbarsPlugin = require('./lib/htmlbars-plugin');

module.exports = {
  name: 'ember-cli-jss',

  included(app) {
    app.import('vendor/jss.min.js');
    app.import('vendor/jss-preset-default.min.js');
  },

  setupPreprocessorRegistry(type, registry) {
    if (type !== 'parent') {
      return;
    }

    registry.add('htmlbars-ast-plugin', {
      name: 'ember-cli-jss',
      plugin: HtmlbarsPlugin,
      baseDir: () => __dirname,
    });
  },
};
