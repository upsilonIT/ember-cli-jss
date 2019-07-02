'use strict';

const HtmlbarsPlugin = require('./lib/htmlbars-plugin');

module.exports = {
  name: 'ember-cli-jss',

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
