import { setup } from 'ember-cli-jss';
import preset from 'jss-preset-default';

export function initialize() {
  setup(preset());
}

export default {
  name: 'ember-cli-jss',
  initialize,
};
