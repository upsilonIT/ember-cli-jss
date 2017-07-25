/* eslint-env node */

const path = require('path');
const Funnel = require('broccoli-funnel');
const MergeTrees = require('broccoli-merge-trees');
const Rollup = require('broccoli-rollup');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const replace = require('rollup-plugin-replace');
const HtmlbarsPlugin = require('./lib/htmlbars-plugin');

module.exports = {
  name: 'ember-cli-jss',

  included(...args) {
    this._super.included(...args);

    this.import('vendor/jss.amd.js');
    this.import('vendor/jss-preset-default.amd.js');
  },

  treeForVendor(tree) {
    const trees = ['jss', 'jss-preset-default'].map((item) => {
      const itemPath = path.dirname(require.resolve(`${item}/lib/index.js`));
      const itemTree = new Funnel(itemPath);
      const { env } = (this.app || this.parent.app);

      return new Rollup(itemTree, {
        rollup: {
          entry: './index.js',
          dest: `${item}.amd.js`,
          format: 'amd',
          moduleId: item,
          exports: 'named',
          plugins: [
            resolve(),
            commonjs(),
            replace({
              'process.env.NODE_ENV': JSON.stringify(env),
            }),
          ],
        },
      });
    });

    if (tree) {
      trees.push(tree);
    }

    return new MergeTrees(trees, {
      overwrite: true,
    });
  },

  setupPreprocessorRegistry(type, registry) {
    if (type !== 'parent') { return; }

    registry.add('htmlbars-ast-plugin', {
      name: 'ember-cli-jss',
      plugin: HtmlbarsPlugin,
      baseDir: () => __dirname,
    });
  },
};
