import Component from '@ember/component';
import JSS, { StyleSheet } from 'ember-cli-jss';

const stylesheet = new StyleSheet({
  wrapper: {
    width: 600,
    display: 'none',
  },

  show: {
    display: 'block',
  },

  content: {
    color: data => data.color,
  },
});

export default Component.extend(JSS, {
  stylesheet,
  jssNames: ['wrapper'],
  jssNameBindings: ['isShow:show'],
  jssObservedProps: ['color'],

  color: 'blue',
  isShow: true,

  actions: {
    changeColor(color) {
      this.set('color', color);
    },
  },
});
