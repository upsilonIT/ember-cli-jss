import Application from '../app';
import config from '../config/environment';
import { setApplication } from '@ember/test-helpers';
import { start } from 'ember-qunit';
import jss from 'jss';
import preset from 'jss-preset-default';

setApplication(Application.create(config.APP));

start();

jss.setup({
  plugins: preset().plugins,
  createGenerateId: () => rule => `jss--${rule.key}`,
});
