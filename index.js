'use strict';

const HtmlbarsPlugin = require('./lib/htmlbars-plugin');

module.exports = {
  name: 'ember-cli-jss',

  included(app) {
    app.import('node_modules/jss/dist/jss.min.js', {
      using: [{ transformation: 'amd', as: 'jss' }],
    });

    app.import(
      'node_modules/jss-preset-default/dist/jss-preset-default.min.js',
      {
        using: [{ transformation: 'amd', as: 'jss-preset-default' }],
      },
    );
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
