import { setup } from 'ember-cli-jss';
import preset from 'npm:jss-preset-default';

export function initialize() {
  setup(preset.default());
}

export default {
  name: 'ember-cli-jss',
  initialize,
};
