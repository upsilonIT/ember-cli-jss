/* eslint-env node */

'use strict';

const path = require('path');
const MergeTrees = require('broccoli-merge-trees');
const WebpackWriter = require('broccoli-webpack');
const HtmlbarsPlugin = require('./lib/htmlbars-plugin');

module.exports = {
  name: 'ember-cli-jss',

  included() {
    this._super.included(...arguments);

    this.import('vendor/jss.amd.js');
    this.import('vendor/jss-preset-default.amd.js');
  },

  treeForVendor(tree) {
    const trees = ['jss', 'jss-preset-default'].map((item) => {
      const modulePath = path.dirname(require.resolve(`${item}/dist/${item}.js`));

      return new WebpackWriter([modulePath], {
        entry: `./${item}.js`,

        output: {
          filename: `${item}.amd.js`,
          library: item,
          libraryTarget: 'amd',
        }
      });
    });

    if (tree) {
      trees.push(tree);
    }

    return new MergeTrees(trees, {
      overwrite: true,
    });
  },

  setupPreprocessorRegistry: function(type, registry) {
    if (type !== 'parent') { return; }

    registry.add('htmlbars-ast-plugin', {
      name: 'ember-cli-jss',
      plugin: HtmlbarsPlugin,
      baseDir: () => __dirname,
    });
  },
};
